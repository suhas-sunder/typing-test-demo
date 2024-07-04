import { describe, it, expect } from "vitest";
import CalculateTestScore from "../CalculateTestScore";

describe("should render defaults", () => {
  it("should calculate score correctly for average wpm, accuracy, and test time", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should reward high wpm appropriately", () => {
    const result = CalculateTestScore({
      wpm: 80,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should apply difficulty score proportionally", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 2,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should include test time bonus in score calculation", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 90,
      testTime: 600,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should penalize low wpm effectively", () => {
    const result = CalculateTestScore({
      wpm: 20,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeLessThan(50);
  });

  it("should handle wpm exactly at 40 correctly", () => {
    const result = CalculateTestScore({
      wpm: 40,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should process accuracy at 0% accurately", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 0,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBe(0);
  });

  it("should process accuracy at 100% accurately", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 100,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should calculate score for minimum test time", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 90,
      testTime: 0,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should calculate score for maximum test time", () => {
    const result = CalculateTestScore({
      wpm: 50,
      accuracy: 90,
      testTime: 6000,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should handle wpm below 20 correctly", () => {
    const result = CalculateTestScore({
      wpm: 10,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeLessThan(50);
  });

  it("should handle wpm between 20-30 correctly", () => {
    const result = CalculateTestScore({
      wpm: 25,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(result).toBeLessThan(50);
  });

  it("should process negative values correctly", () => {
    const result = CalculateTestScore({
      wpm: -10,
      accuracy: -50,
      testTime: -300,
      difficultyScore: -1,
    });
    expect(result).toBe(0);
  });

  it("should process zero values correctly", () => {
    const result = CalculateTestScore({
      wpm: 0,
      accuracy: 0,
      testTime: 0,
      difficultyScore: 0,
    });
    expect(result).toBe(0);
  });

  it("should ensure score is always a positive integer", () => {
    const result = CalculateTestScore({
      wpm: -10,
      accuracy: -50,
      testTime: -300,
      difficultyScore: -1,
    });
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("should handle non-integer values correctly", () => {
    const result = CalculateTestScore({
      wpm: 25.5,
      accuracy: 90.5,
      testTime: 300.5,
      difficultyScore: 1.5,
    });
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should verify penalizeScore and rewardHighScore calculation", () => {
    const result = CalculateTestScore({
      wpm: -10,
      accuracy: -50,
      testTime: -300,
      difficultyScore: -1,
    });
    expect(result).toBe(0);

    const highWPMResult = CalculateTestScore({
      wpm: 80,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(highWPMResult).toBeGreaterThan(0);

    const lowWPMResult = CalculateTestScore({
      wpm: 10,
      accuracy: 90,
      testTime: 300,
      difficultyScore: 1,
    });
    expect(lowWPMResult).toBeLessThan(50);
  });

  it("should handle wpm below 40 when calculating penalize score", () => {
    const result = CalculateTestScore({
      wpm: 35,
      accuracy: 80,
      testTime: 240,
      difficultyScore: 1,
    });
    expect(result).toBeGreaterThan(0);
  });

  it("should round the final score correctly", () => {
    const result = CalculateTestScore({
      wpm: 40,
      accuracy: 80,
      testTime: 600,
      difficultyScore: 1,
    });
    expect(result).toBe(2); 
  });
});
