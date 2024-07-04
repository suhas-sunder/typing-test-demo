import { describe, it, expect } from "vitest";
import CalculateDifficulty from "../CalculateDifficulty";

describe("should render defaults", () => {
  it("should calculate correct difficulty score for given targetDifficulty", () => {
    const difficultyPoints = { easy: { point: "5" } };
    const difficultySettings = {
      easy: {
        settings: ["easy"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "easy";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.difficultyText).toBe("Easy");
  });

  it("should return correct difficultyText based on calculated difficultyScore", () => {
    const difficultyPoints = { medium: { point: "30" } };
    const difficultySettings = {
      medium: {
        settings: ["medium"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "medium";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.difficultyText).toBe("Medium");
  });

  it("should return correct iconColour based on calculated difficultyScore", () => {
    const difficultyPoints = { hard: { point: "80" } };
    const difficultySettings = {
      hard: {
        settings: ["hard"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "hard";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.iconColour).toBe("text-red-400");
  });

  it("should return correct iconTwoColour based on calculated difficultyScore", () => {
    const difficultyPoints = { extremelyHard: { point: "240" } };
    const difficultySettings = {
      extremelyHard: {
        settings: ["extremelyHard"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "extremelyHard";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.iconTwoColour).toBe("opacity-30");
  });

  it("should have default values for iconColour and iconTwoColour", () => {
    const difficultyPoints = { easy: { point: "5" } };
    const difficultySettings = {
      easy: {
        settings: ["easy"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "easy";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.iconColour).toBe("text-sky-300");
    expect(result.iconTwoColour).toBe("hidden");
  });
});

describe("Edge Cases for Difficulty Calculation", () => {
  it("should return correct difficultyText when difficultyScore is at the boundary", () => {
    // Test implementation
    const difficultyPoints = { medium: { point: "20" } };
    const difficultySettings = {
      medium: {
        settings: ["medium"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "medium";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.difficultyText).toBe("Medium");
  });
});

describe("Handling of Empty Settings Array", () => {
  it("should default to medium if no settings are provided", () => {
    // Test implementation
    const difficultyPoints = { easy: { point: "5" } };
    const difficultySettings = {
      easy: {
        settings: [], // Empty settings array
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "easy";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.difficultyText).toBe("Medium");
  });
});

describe("Verification of Icon Colors for Each Difficulty Level", () => {
  it("should return correct iconColor for each difficulty level", () => {
    // Test implementation
    const difficultyPoints = { hard: { point: "80" } };
    const difficultySettings = {
      hard: {
        settings: ["hard"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "hard";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.iconColour).toBe("text-red-400");
  });

  it("should return correct iconTwoColor for each difficulty level", () => {
    // Test implementation
    const difficultyPoints = { extremelyHard: { point: "240" } };
    const difficultySettings = {
      extremelyHard: {
        settings: ["extremelyHard"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "extremelyHard";
    const result = CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    expect(result.iconTwoColour).toBe("opacity-30");
  });
});

describe("Performance Testing", () => {
  it("should execute within acceptable time limits", () => {
    // Test implementation
    const difficultyPoints = { easy: { point: "5" } };
    const difficultySettings = {
      easy: {
        settings: ["easy"],
        selected: true,
        default: true,
        scoreBonus: 0,
      },
    };
    const targetDifficulty = "easy";
    // Measure the execution time
    const startTime = performance.now();
    CalculateDifficulty({
      difficultyPoints,
      difficultySettings,
      targetDifficulty,
    });
    const endTime = performance.now();
    // Expect the execution time to be less than 100 milliseconds (adjust as needed)
    expect(endTime - startTime).toBeLessThan(100);
  });
});
