import validation from "./validation";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const {
  sanitize,
  validateString,
} = validation();

//Generate JWT token for the provided user ID.
function jwtGenerator(user_id: string) {
  try {
    // Validate input
    validateString(user_id, "User ID");

    const payload = {
      user: sanitize(user_id),
    };

    // Sign the payload with JWT_SECRET and set expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.SESSION_EXP,
    });

    return token;
  } catch (error: any) {
    // Handle errors
    console.error("JWT generation error:", error.message);
    throw new Error("Failed to generate JWT token");
  }
}

module.exports = jwtGenerator;
