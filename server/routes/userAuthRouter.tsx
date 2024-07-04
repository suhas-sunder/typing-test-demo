//userRouter.tsx
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import validation from "../utils/validation";
const bcrypt = require("bcrypt");
const { pool } = require("../config/dbConfig");
const jwtGenerator = require("../utils/jwtGenerator");
const infoValidation = require("../middleware/infoValidation");
const authorization = require("../middleware/authorization"); // Authorization middleware checks if jwt token is valid.
const transportNodeMailer = require("../utils/transportNodeMailer");

require("dotenv").config({ path: "./config.env" });

const transporter = transportNodeMailer();
const { sanitize, validateString } = validation();
const saltRound = 12;

router.post(
  "/register",
  infoValidation, // Assuming this middleware validates other aspects of the request
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body.data;

      // Validation and sanitization
      validateString(username, "Username");
      validateString(email, "Email");
      validateString(password, "Password");

      // Sanitize inputs
      const sanitizedUsername = sanitize(username);
      const sanitizedEmail = sanitize(email);
      const sanitizedPassword = sanitize(password);

      // Get user from DB
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [sanitizedEmail]
      );

      // Check if user already exists in the DB
      if (user.rows.length !== 0) {
        return res
          .status(401)
          .json("An account with this email already exists!");
      }

      // Hash password
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
      const datetime = new Date();
      const emailVerificationToken = crypto.randomUUID();

      // async..await is not allowed in global scope, must use a wrapper

      // Create and add new user to DB
      const newUser = await pool.query(
        `INSERT INTO users (user_name, user_email, user_password, user_date_time, email_token) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          sanitizedUsername,
          sanitizedEmail,
          hashedPassword,
          datetime,
          emailVerificationToken,
        ]
      );

      if (!newUser)
        return res.status(500).json("Server Error: Failed to setup new user!");

      // Generate JWT token (Since we're using email verification we don't need to set jwt just yet. Only when user logs in. I'll keep this code for now just incase. Delete later.)
      // const jwt_token = await jwtGenerator(newUser.rows[0].user_id);
      // res.json({ jwt_token });

      res.status(200).json("User was successfully registered!");
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json("Internal Server Error: Unable to register user");
    }
  }
);

router.post("/login", infoValidation, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;

    // Validate input data
    if (!email || !password) {
      return res.status(401).json("Email and password are required!");
    }

    // Validate and sanitize input data
    validateString(email, "Email");
    validateString(password, "Password");

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // Check if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid email or password!");
    }

    const { user_password, email_token, user_verified, user_name } =
      user.rows[0];

    // Compare hashed password with input password
    const validPassword = await bcrypt.compare(password, user_password);

    if (!validPassword) {
      return res.status(401).json("Invalid email or password!");
    }

    // If user is not verified, pass username and handle email verification request from client side
    if (email_token && !user_verified)
      return res.status(200).json({ user_name });

    // Generate JWT token
    const jwt_token = await jwtGenerator(user.rows[0].user_id);

    res.json({ jwt_token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to login");
  }
});

//Send verification email to user
router.post("/send-verification", async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body.data;

    // Validate input data
    if (!email || !username) {
      return res.status(401).json("Email and username are required!");
    }

    // Validate and sanitize input data
    validateString(email, "Email");
    validateString(username, "Username");

    const verificationResult = await pool.query(
      "SELECT email_token, user_verified FROM users WHERE user_email = $1 AND user_name = $2",
      [email, username]
    );

    if (verificationResult.rows.length === 0) {
      return res.status(404).json("User not found!");
    }

    const { email_token, user_verified } = verificationResult.rows[0];

    if (!email_token && user_verified)
      return res.status(401).json("Email has already been verified!");

    if (!email_token && !user_verified)
      return res
        .status(401)
        .json("User has not been registered. Verification cannot be sent!");

    async function main() {
      const mailTo =
        email === "guests@imaginaryemail.com"
          ? "test@email.com"
          : email; //Setup for guest email

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"FreeTypingCamp.com" <test@email.com>', // sender address
        to:
          process.env.NODE_ENV === "development"
            ? process.env.DEV_EMAIL
            : mailTo, // list of receivers
        subject: "Verify your email...", // Subject line
        // text: ``, // plain text body
        html: `<p>Dear ${username}, thank you for signing up to Free Typing Camp! Here is your verification link:</p><a href='https://freetypingcamp.com/verify-email?emailToken=${email_token}'>Verify Your Email!</a> <p>Once you visit this link you should be automatically verified. Once you are verified you can login using your email and password.</>  <p>If you did not make this request, feel free to ignore this email.</p>  <p>If you face any issues please feel free to contact us at freetypingcamp@gmail.com or admin@freetypingcamp.com and we'll get back to you as soon as possible. Happy Typing!</p> <p>-FreeTypingCamp</p>`, // html body
      });

      if (!info) {
        return res.status(500).json("Failed to send verification email!");
      }
    }

    main().catch(console.error);

    res.status(200).json("Email verification successfully sent!");
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json("Internal Server Error: Failed to send verification email");
  }
});

//Check if verification code is valid & verify user
router.post("/verify-email", async (req: Request, res: Response) => {
  try {
    const { emailToken } = req.body.data;

    // Validate input data
    if (!emailToken) {
      return res.status(401).json("Email reset link is invalid!");
    }

    // Validate and sanitize input data
    validateString(emailToken, "emailToken");
    const userVerified = true;
    const clearEmailToken = null;

    //If email token exists
    const verificationResult = await pool.query(
      "UPDATE users SET email_token = $2, user_verified = $3 WHERE email_token = $1 RETURNING *",
      [emailToken, clearEmailToken, userVerified]
    );

    if (verificationResult.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email verification link. Verification failed!",
      });
    }

    const { user_name, user_email } = verificationResult.rows[0];

    res.status(200).json({ user_name, user_email });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to verify user!");
  }
});

//Send password reset email to user
router.post("/send-pwd-reset-email", async (req: Request, res: Response) => {
  try {
    const { email } = req.body.data;

    // Validate input data
    if (!email) {
      return res.status(401).json("A valid email is required!");
    }

    // Validate and sanitize input data
    validateString(email, "Email");

    const verificationResult = await pool.query(
      "SELECT user_name FROM users WHERE user_email = $1",
      [email]
    );

    if (verificationResult.rows.length === 0) {
      return res
        .status(404)
        .json("The email provided has not yet been registered!");
    }

    const { user_name } = verificationResult.rows[0];

    const passwordResetToken = crypto.randomUUID();

    const saveResetTokenResult = await pool.query(
      `UPDATE users SET pwd_reset_token = $1 WHERE user_email = $2 RETURNING *`,
      [passwordResetToken, email]
    );

    if (saveResetTokenResult.rows.length === 0) {
      return res
        .status(500)
        .json("Server error! Failed to send a password reset email!");
    }

    async function main() {
      const mailTo =
        email === "guests@imaginaryemail.com"
          ? "freetypingcamp@gmail.com"
          : email; //Setup for guest email. This way I can know if someone is trying to reset guest email pwd. Just for my own knowledge.

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"FreeTypingCamp.com" <freetypingcamp@gmail.com>', // sender address
        to:
          process.env.NODE_ENV === "development"
            ? process.env.DEV_EMAIL
            : mailTo, // list of receivers
        subject: "Verify your email...", // Subject line
        // text: ``, // plain text body
        html: `<p>Dear ${user_name}, Here is the one time password reset link you requested:</p><a href='https://freetypingcamp.com/forgot-password?resetToken=${passwordResetToken}'>Reset your password!</a> <p>Once you visit this link you should be able to enter a new password and login.</> <p>If you did not make this request, feel free to ignore this email.</p> <p>If you face any issues please feel free to contact us at freetypingcamp@gmail.com or admin@freetypingcamp.com and we'll get back to you as soon as possible. Happy Typing!</p> <p>-FreeTypingCamp</p>`, // html body
      });

      if (!info) {
        return res.status(500).json("Failed to send password reset email!");
      }
    }

    main().catch(console.error);

    res.status(200).json("Password reset email successfully sent!");
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json("Internal Server Error: Failed to send password reset email");
  }
});

//Check if verification code is valid & verify user
router.post("/verify-pwd-token", async (req: Request, res: Response) => {
  try {
    const { resetToken } = req.body.data;

    // Validate input data
    if (!resetToken) {
      return res.status(401).json("Password reset link is invalid!");
    }

    // Validate and sanitize input data
    validateString(resetToken, "emailToken");

    //If email token exists
    const verificationResult = await pool.query(
      "SELECT user_email FROM users WHERE  pwd_reset_token = $1",
      [resetToken]
    );

    if (verificationResult.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid reset link. Reset password failed!" });
    }

    const { user_email } = verificationResult.rows[0];

    res.status(200).json({ user_email });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to verify user!");
  }
});

router.post("/reset-pwd", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;

    // Validate input data
    if (!email || !password) {
      return res.status(401).json("Email or password is invalid!");
    }

    // Validate and sanitize input data
    validateString(email, "email");
    validateString(password, "password");

    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);

    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
    const clearResetToken = null;

    //If email token exists
    const pwdResetResult = await pool.query(
      "UPDATE users SET user_password = $1, pwd_reset_token =$2  WHERE user_email = $3 RETURNING *",
      [hashedPassword, clearResetToken, sanitizedEmail]
    );

    if (pwdResetResult.rows.length === 0) {
      return res
        .status(500)
        .json({ error: "Server error: Failed to reset password!" });
    }

    // Generate JWT token
    const jwt_token = await jwtGenerator(pwdResetResult.rows[0].user_id);

    res.status(200).json({ jwt_token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to verify user!");
  }
});

//Verify user login session via jwt token
router.get("/is-verify", authorization, async (req: Request, res: Response) => {
  try {
    // Extract user ID from the authorization token
    const userId = req.user;

    // Query the database to get user details
    const result = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [userId]
    );

    // Check if user details were found
    if (result.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // Extract user details from the query result
    const userName = result.rows[0].user_name;
    const email = result.rows[0].user_email;

    // Respond with user details and verification status
    res.json({ verified: true, userId, userName, email });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Internal Server Error: Failed to verify user");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    //Eventually perform any cleanup operations here based on forget me settings (e.g., clearing session data)
    // Respond with a JSON indicating successful logout
    res.json({ success: true });
  } catch (err: any) {
    // Handle any errors that might occur during the logout process
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to logout. Internal Server Error",
    });
  }
});

router.post("/account-update", async (req: Request, res: Response) => {
  try {
    const { userId, username, email, password } = req.body.data;

    // Validate input data
    if (!userId && !username && !email && !password) {
      return res.status(401).json("Invalid data provided!");
    }

    // Validate and sanitize input data but only if value exists since not all are mandatory
    userId && validateString(userId, "User id");
    username && validateString(username, "Username");
    email && validateString(email, "Email");
    password && validateString(password, "Password");

    // Sanitize inputs
    const sanitizedUsername = username && sanitize(username);
    const sanitizedEmail = email && sanitize(email);
    const sanitizedPassword = password && sanitize(password);

    // Hash password if it exists
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

    // Update user's information in the database
    const updatePromises = [];

    if (username) {
      updatePromises.push(
        pool.query(
          `UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *`,
          [sanitizedUsername, userId]
        )
      );
    }

    // Get user from DB if email exists
    if (email) {
      const user = await pool.query(
        `SELECT * FROM users WHERE user_email = $1`,
        [sanitizedEmail]
      );
      if (user.rows.length !== 0) {
        return res
          .status(401)
          .json("An account with this email already exists!");
      }

      updatePromises.push(
        pool.query(
          `UPDATE users SET user_email = $1 WHERE user_id = $2 RETURNING *`,
          [sanitizedEmail, userId]
        )
      );
    }

    if (sanitizedPassword) {
      updatePromises.push(
        pool.query(
          `UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *`,
          [hashedPassword, userId]
        )
      );
    }

    const updatedResults = await Promise.all(updatePromises);

    // Check if any updates failed
    const failedUpdates = updatedResults.filter(
      (result) => !result || !result.rows.length
    );

    if (failedUpdates.length > 0) {
      return res.status(500).json("Failed to update user information!");
    }

    // Generate JWT token
    const jwt_token = await jwtGenerator(userId);

    res.json({ username: sanitizedUsername, email: sanitizedEmail, jwt_token });
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json("Internal Server Error: Failed to update user information");
  }
});

router.all("*", async (res: Response) => {
  res.status(404).json({
    timestamp: Date.now(),
    msg: "No route matches your request",
    code: 404,
  });
});

module.exports = router;
