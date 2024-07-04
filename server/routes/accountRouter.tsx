const express = require("express");
const router = express.Router();
import { Request, Response, NextFunction } from "express";
import validation from "../utils/validation";
const { pool } = require("../config/dbConfig");

const { sanitize, validateString, validateNumber, validateDate } = validation(); //Provide methods for validating and sanitizing inputs

interface ScoreData {
  user_id: string;
  test_name: string;
  total_chars: number;
  difficultyLevel: string;
  correct_chars: number;
  misspelled_chars: number;
  wpm: number;
  cpm: number;
  test_score: number;
  test_accuracy: number;
  test_time_sec: number;
  screen_size_info: string;
  difficulty_name: string;
  difficulty_settings: string[];
}

router.get("/score", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    // Validation
    validateString(userId, "User id");

    // Retrieve user info based on valid user id
    const getScore = await pool.query("SELECT * FROM score WHERE user_id=$1", [
      userId,
    ]);

    res.json(getScore.rows);
  } catch (err: any) {
    console.error("An error occurred while fetching score:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/score", async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      test_name,
      total_chars,
      difficultyLevel,
      correct_chars,
      misspelled_chars,
      wpm,
      cpm,
      test_score,
      test_accuracy,
      test_time_sec,
      screen_size_info,
      difficulty_name,
      difficulty_settings,
    }: ScoreData = req.body.data;

    // Validation
    validateString(user_id, "User id");
    validateString(difficultyLevel, "Difficulty level");
    validateString(test_name, "Test name");
    validateNumber(total_chars, "Total score char count");
    validateNumber(correct_chars, "Total correct char count");
    validateNumber(misspelled_chars, "Total misspelled char count");
    validateNumber(wpm, "Wpm");
    validateNumber(cpm, "Cpm");
    validateNumber(test_score, "Test score");
    validateNumber(test_accuracy, "Test accuracy");
    validateNumber(test_time_sec, "Test time");
    validateString(screen_size_info, "Screen size info");
    validateString(difficulty_name, "Difficulty name");

    if (difficulty_settings === null || difficulty_settings === undefined) {
      throw new Error("Invalid difficulty settings!");
    }

    // Sanitize inputs
    const sanitizedInputs = {
      user_id: sanitize(user_id),
      difficultyLevel: sanitize(difficultyLevel),
      test_name: sanitize(test_name),
      total_chars: sanitize(total_chars),
      correct_chars: sanitize(correct_chars),
      misspelled_chars: sanitize(misspelled_chars),
      wpm: sanitize(wpm),
      cpm: sanitize(cpm),
      test_score: sanitize(test_score),
      test_accuracy: sanitize(test_accuracy),
      test_time_sec: sanitize(test_time_sec),
      screen_size_info: sanitize(screen_size_info),
      difficulty_name: sanitize(difficulty_name),
      difficulty_settings: sanitize(difficulty_settings),
    };

    // Retrieve user info based on valid jwt token
    const updateScore = await pool.query(
      `INSERT INTO score 
        (user_id, difficulty_level, test_name, total_chars, correct_chars, misspelled_chars, wpm, cpm, test_score, test_accuracy, test_time_sec, screen_size_info, difficulty_name, difficulty_settings) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        sanitizedInputs.user_id,
        sanitizedInputs.difficultyLevel,
        sanitizedInputs.test_name,
        sanitizedInputs.total_chars,
        sanitizedInputs.correct_chars,
        sanitizedInputs.misspelled_chars,
        sanitizedInputs.wpm,
        sanitizedInputs.cpm,
        sanitizedInputs.test_score,
        sanitizedInputs.test_accuracy,
        sanitizedInputs.test_time_sec,
        sanitizedInputs.screen_size_info,
        sanitizedInputs.difficulty_name,
        sanitizedInputs.difficulty_settings,
      ]
    );

    if (!updateScore) {
      console.error("Failed to update score");
      return res.status(500).json("Internal server error");
    }

    res.status(200).json("Score updated");
  } catch (err: any) {
    console.error("Error occurred:", err);

    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/weekly-stats", async (req: Request, res: Response) => {
  try {
    const { userId, startDate, endDate } = req.query;

    // Validate userId
    validateString(userId, "User id");

    // Validate startDate
    const validStartDate = validateDate(startDate, "Start date").toISOString();

    // Validate endDate
    const validEndDate = validateDate(endDate, "End date").toISOString();

    const weeklyStatsQuery = `SELECT 
          COALESCE(SUM(test_score), 0) AS total_score,
          COALESCE(SUM(total_chars), 0) AS total_chars,
          COALESCE(SUM(test_time_sec), 0) AS total_typing_time_sec,
          COALESCE(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))/86400, 0) AS total_days_active  
        FROM score
        WHERE 
          user_id = $1 
          AND cast(created_at as date) BETWEEN $2 AND $3::timestamp`;

    const weeklyStats = await pool.query(weeklyStatsQuery, [
      userId,
      validStartDate,
      validEndDate,
    ]);

    const stats = {
      totalScore: parseInt(weeklyStats.rows[0].total_score ?? 0),
      totalChars: Math.ceil(weeklyStats.rows[0].total_chars) ?? 0,
      totalTypingTimeSec: parseInt(
        weeklyStats.rows[0].total_typing_time_sec ?? 0
      ),
      totalDaysActive: Math.ceil(weeklyStats.rows[0].total_days_active) ?? 0,
    };

    res.json(stats);
  } catch (err: any) {
    console.error("An error occurred while fetching weekly stats:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/lifetime-stats", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    // Validation
    validateString(userId, "User id");
    const combinedStatsQuery = `SELECT 
          COALESCE(SUM(test_score), 0) AS total_score,
          COALESCE(SUM(total_chars), 0) AS total_chars,
          COALESCE(SUM(test_time_sec), 0) AS total_typing_time_sec,
          COALESCE(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))/86400, 0) AS total_days_active
        FROM score
        WHERE 
          user_id = $1 
`;

    const combinedStats = await pool.query(combinedStatsQuery, [userId]);
    const stats = {
      totalScore: parseInt(combinedStats.rows[0].total_score),
      totalChars: Math.ceil(combinedStats.rows[0].total_chars),
      totalTypingTimeSec: parseInt(combinedStats.rows[0].total_typing_time_sec),
      totalDaysActive: Math.ceil(combinedStats.rows[0].total_days_active),
    };

    res.json(stats);
  } catch (err: any) {
    console.error("An error occurred while fetching lifetime stats:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/totalscore", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    // Validation
    validateString(userId, "User id");

    // Retrieve user info based on valid jwt token
    const getScore = await pool.query(
      "SELECT SUM(test_score) AS totalScore FROM score WHERE user_id=$1",
      [userId]
    );

    res.json(getScore.rows[0]);
  } catch (err: any) {
    console.error("An error occurred while fetching total score:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: "Server Error" });
  }
});

async function fetchBestStats(
  userId: string,
  test_name: string,
  difficulty_name: string | undefined,
  orderBy: string
) {
  const query = `SELECT * FROM score 
      WHERE user_id = $1 AND test_name = $2 ${difficulty_name ? "AND difficulty_name = $3" : ""}
      ORDER BY ${orderBy} DESC LIMIT 1`;

  const params = [userId, test_name];

  if (difficulty_name) {
    params.push(sanitize(difficulty_name));
  }

  const result = await pool.query(query, params);

  let orderByLabel;

  if (orderBy === "wpm") {
    orderByLabel = "WPM";
  } else if (orderBy === "test_score") {
    orderByLabel = "Score";
  } else if (orderBy === "test_time_sec") {
    orderByLabel = "Time";
  } else {
    orderByLabel = "Words";
  }

  const title = `Best ${orderByLabel}`;

  return {
    title,
    id: `best-${orderByLabel.toLowerCase()}`,
    testName: result?.rows[0]?.test_name || "",
    finalWPM: result?.rows[0]?.wpm || 0,
    finalCPM: result?.rows[0]?.cpm || 0,
    createdAt: result?.rows[0]?.created_at || null,
    seconds: result?.rows[0]?.test_time_sec || 0,
    accuracy: result?.rows[0]?.test_accuracy || 0,
    score: result?.rows[0]?.test_score || 0,
    chars: result?.rows[0]?.total_chars || 0,
    words: Math.floor(result?.rows[0]?.total_chars / 5) || 0,
    difficultyName: result?.rows[0]?.difficulty_name || "",
    difficultyLevel: result?.rows[0]?.difficulty_level || "",
    difficultyFilters: result?.rows[0]?.difficulty_settings || "",
  };
}

//Fetch best stats data for specific tests based on difficulty level and test type (name) or just based on test name for a more general result
router.get("/best-stats", async (req: Request, res: Response) => {
  try {
    const { userId, test_name, difficulty_name } = req.query;

    // Validation
    validateString(userId, "User id");
    validateString(test_name, "Test name");
    if (difficulty_name !== undefined) {
      validateString(difficulty_name, "Difficulty name");
    }

    const bestWPM = await fetchBestStats(
      userId as string,
      test_name as string,
      difficulty_name as string,
      "wpm"
    );
    const bestScore = await fetchBestStats(
      userId as string,
      test_name as string,
      difficulty_name as string,
      "test_score"
    );
    const bestTime = await fetchBestStats(
      userId as string,
      test_name as string,
      difficulty_name as string,
      "test_time_sec"
    );
    const bestWords = await fetchBestStats(
      userId as string,
      test_name as string,
      difficulty_name as string,
      "total_chars"
    );

    res.json({ bestWPM, bestScore, bestTime, bestWords });
  } catch (err: any) {
    console.error("An error occurred while fetching best stats:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
