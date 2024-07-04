const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import validation from "../utils/validation";
const { pool } = require("../config/dbConfig");

const { sanitize, validateString } = validation(); //Provide methods for validating and sanitizing inputs

// Get all image defaults
router.get("/defaults", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    // Validation
    validateString(userId, "User id");

    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [userId]
    );

    res.json(getSavedImages.rows[0]);
  } catch (err: any) {
    console.error("An error occurred while fetching image defaults:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json("Server Error: Could not get image defaults!");
  }
});

// Create or update profile image url
router.post("/default-profile", async (req: Request, res: Response) => {
  try {
    const {
      profilePathname,
      userId,
    }: { profilePathname: string; userId: number } = req.body.data;

    // Validation
    validateString(profilePathname, "Profile image pathname");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedProfilePathname = sanitize(profilePathname);

    // Check if data exists in db to decide if we should create or update data
    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [userId]
    );

    if (!getSavedImages.rows[0]) {
      // If user doesn't exist, add user and pathname to db
      const createProfilePathname = await pool.query(
        "INSERT INTO images(profile_pathname, user_id) VALUES ($1, $2)",
        [sanitizedProfilePathname, userId]
      );

      if (!createProfilePathname) {
        return res.status(401).json("Failed to update profile image pathname!");
      }
    } else {
      // If user already exists, update pathname in db
      const updateProfilePathname = await pool.query(
        "UPDATE images SET profile_pathname=$1 WHERE user_id=$2",
        [sanitizedProfilePathname, userId]
      );

      if (!updateProfilePathname) {
        return res.status(401).json("Failed to update profile image pathname!");
      }
    }

    res.status(200).json("Profile image pathname updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating profile image pathname:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update profile image pathname!");
  }
});

// Create or update profile image into hex code
router.post("/default-profile-hex", async (req: Request, res: Response) => {
  try {
    const { profileHex, userId } = req.body.data;

    // Validation
    validateString(profileHex, "Profile image colour code");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedProfileHex = sanitize(profileHex);

    // Check if data exists in db to decide if we should create or update data
    const getSavedImages = await pool.query(
      "SELECT * FROM images WHERE user_id=$1",
      [userId]
    );

    if (getSavedImages.rows.length === 0) {
      const createProfileHex = await pool.query(
        "INSERT INTO images(profile_hex_code, user_id) VALUES ($1, $2)",
        [sanitizedProfileHex, userId]
      );

      if (!createProfileHex) {
        return res
          .status(401)
          .json("Failed to create profile image colour code!");
      }
    } else {
      const updateProfileHex = await pool.query(
        "UPDATE images SET profile_hex_code=$1 WHERE user_id=$2",
        [sanitizedProfileHex, userId]
      );

      if (!updateProfileHex) {
        return res
          .status(401)
          .json("Failed to update profile image colour code!");
      }
    }

    res.status(200).json("Profile image colour code updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating profile image colour code:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update profile image colour code!");
  }
});

// Create or update default profile image url
router.post("/default-start-menu-1", async (req: Request, res: Response) => {
  try {
    const { startMenu1Pathname, userId } = req.body.data;

    // Validation
    validateString(startMenu1Pathname, "1st start menu image pathname");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedStartMenu1Pathname = sanitize(startMenu1Pathname);

    const updateStartMenu1Pathname = await pool.query(
      "INSERT INTO images(start_menu_1_pathname, user_id) VALUES ($1, $2)",
      [sanitizedStartMenu1Pathname, userId]
    );

    if (!updateStartMenu1Pathname) {
      return res
        .status(401)
        .json("Failed to update 1st start menu image pathname!");
    }

    res.status(200).json("1st start menu image pathname updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating 1st start menu image pathname:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update 1st start menu image pathname!");
  }
});

// Create or update profile image hex code
router.post(
  "/default-start-menu-1-hex",
  async (req: Request, res: Response) => {
    try {
      const { startMenu1Hex, userId } = req.body.data;

      // Validation
      validateString(startMenu1Hex, "1st start menu image colour code");
      validateString(userId, "User id");

      // Sanitize input
      const sanitizedStartMenu1Hex = sanitize(startMenu1Hex);

      const updateStartMenu1Hex = await pool.query(
        "INSERT INTO images(start_menu_1_hex_code, user_id) VALUES ($1, $2)",
        [sanitizedStartMenu1Hex, userId]
      );

      if (!updateStartMenu1Hex) {
        return res
          .status(401)
          .json("Failed to update 1st start menu image colour code!");
      }

      res
        .status(200)
        .json("1st start menu image colour code updated successfully!");
    } catch (err: any) {
      console.error(
        "An error occurred while updating 1st start menu image colour code:",
        err
      );
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      res
        .status(500)
        .json(
          "Server Error: Could not update 1st start menu image colour code!"
        );
    }
  }
);

// Create or update profile image url
router.post("/default-start-menu-2", async (req: Request, res: Response) => {
  try {
    const { startMenu2Pathname, userId } = req.body.data;

    // Validation
    validateString(startMenu2Pathname, "2nd start menu image pathname");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedStartMenu2Pathname = sanitize(startMenu2Pathname);

    const updateStartMenu2Pathname = await pool.query(
      "INSERT INTO images(start_menu_2_pathname, user_id) VALUES ($1, $2)",
      [sanitizedStartMenu2Pathname, userId]
    );

    if (!updateStartMenu2Pathname) {
      return res
        .status(401)
        .json("Failed to update 2nd start menu image pathname!");
    }

    res.status(200).json("2nd start menu image pathname updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating 2nd start menu image pathname:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update 2nd start menu image pathname!");
  }
});

// Create or update profile image hex code
router.post(
  "/default-start-menu-2-hex",
  async (req: Request, res: Response) => {
    try {
      const { startMenu2Hex, userId } = req.body.data;

      // Validation
      validateString(startMenu2Hex, "2nd start menu image colour code");
      validateString(userId, "User id");

      // Sanitize input
      const sanitizedStartMenu2Hex = sanitize(startMenu2Hex);

      const updateStartMenu2Hex = await pool.query(
        "INSERT INTO images(start_menu_2_hex_code, user_id) VALUES ($1, $2)",
        [sanitizedStartMenu2Hex, userId]
      );

      if (!updateStartMenu2Hex) {
        return res
          .status(401)
          .json("Failed to update 2nd start menu image colour code!");
      }

      res
        .status(200)
        .json("2nd start menu image colour code updated successfully!");
    } catch (err: any) {
      console.error(
        "An error occurred while updating 2nd start menu image colour code:",
        err
      );
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      res
        .status(500)
        .json(
          "Server Error: Could not update 2nd start menu image colour code!"
        );
    }
  }
);

// Create or update profile image url
router.post("/default-game-over", async (req: Request, res: Response) => {
  try {
    const { gameOverPathname, userId } = req.body.data;

    // Validation
    validateString(gameOverPathname, "Game over image pathname");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedGameOverPathname = sanitize(gameOverPathname);

    const updateGameOverPathname = await pool.query(
      "INSERT INTO images(game_over_pathname, user_id) VALUES ($1, $2)",
      [sanitizedGameOverPathname, userId]
    );

    if (!updateGameOverPathname) {
      return res.status(401).json("Failed to update game over image pathname!");
    }

    res.status(200).json("Game over image pathname updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating game over image pathname:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update game over image pathname!");
  }
});

// Create or update profile image hex code
router.post("/default-game-over-hex", async (req: Request, res: Response) => {
  try {
    const { gameOverHex, userId } = req.body.data;

    // Validation
    validateString(gameOverHex, "Game over image colour code");
    validateString(userId, "User id");

    // Sanitize input
    const sanitizedGameOverHex = sanitize(gameOverHex);

    const updategameOverHex = await pool.query(
      "INSERT INTO images(game_over_hex_code) VALUES ($1)",
      [sanitizedGameOverHex]
    );

    if (!updategameOverHex) {
      throw new Error("Failed to update game over image colour code!");
    }

    res.status(200).json("Game over image colour code updated successfully!");
  } catch (err: any) {
    console.error(
      "An error occurred while updating game over image colour code:",
      err
    );
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res
      .status(500)
      .json("Server Error: Could not update game over image colour code!");
  }
});

module.exports = router;
