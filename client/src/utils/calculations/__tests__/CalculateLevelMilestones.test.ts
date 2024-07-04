import { describe, it, expect } from "vitest";
import CalculateLevelMilestones from "../CalculateLevelMilestones";

describe("should render defaults", () => {
  const result = CalculateLevelMilestones({ totalScore: 15000 });
  it("should calculate correct level and milestone for scores within each milestone range", () => {
    expect(result.level).toBe(25);
    expect(result.milestone).toBe(500);
  });

  it("should return correct mastery title based on calculated level", () => {
    const result = CalculateLevelMilestones({ totalScore: 15000 });
    expect(result.mastery).toBe("Novice");
  });

  it("should handle scores that exactly match milestone thresholds", () => {
    const result = CalculateLevelMilestones({ totalScore: 10000 });
    expect(result.level).toBe(20);
    expect(result.milestone).toBe(500);
  });

  it("should correctly calculate levels and milestones for scores within the first milestone range", () => {
    const result = CalculateLevelMilestones({ totalScore: 2500 });
    expect(result.level).toBe(6);
    expect(result.milestone).toBe(500);
  });

  it("should correctly calculate levels and milestones for scores within the last milestone range", () => {
    const result = CalculateLevelMilestones({ totalScore: 100000000 });
    expect(result.level).toBe(2783);
    expect(result.milestone).toBe(500);
  });

  it("should handle scores that exceed the highest milestone range", () => {
    const result = CalculateLevelMilestones({ totalScore: 200000000 });
    expect(result.level).toBe(4212);
    expect(result.milestone).toBe(500);
  });

  it("should handle scores that are zero", () => {
    const result = CalculateLevelMilestones({ totalScore: 0 });
    expect(result.level).toBe(1);
    expect(result.milestone).toBe(500);
    expect(result.mastery).toBe("Novice");
  });

  it("should handle scores that are just below a milestone threshold", () => {
    const result = CalculateLevelMilestones({ totalScore: 9999 });
    expect(result.level).toBe(20);
    expect(result.milestone).toBe(1);
  });

  it("should handle scores that are just above a milestone threshold", () => {
    const result = CalculateLevelMilestones({ totalScore: 10001 });
    expect(result.level).toBe(20);
    expect(result.milestone).toBe(499);
  });

  it("should handle large scores efficiently without performance degradation", () => {
    const startTime = performance.now();
    const result = CalculateLevelMilestones({ totalScore: 1000000000 });
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Ensure it runs in less than 100ms
    expect(result.level).toBeGreaterThan(0);
  });

  it("should return correct results when level cap is reached", () => {
    const result = CalculateLevelMilestones({
      totalScore: Number.MAX_SAFE_INTEGER,
    });
    expect(result.level).toBe(99999);
    expect(result.milestone).toBe(0);
  });

  it("should correctly handle scores that result in fractional levels", () => {
    const result = CalculateLevelMilestones({ totalScore: 7500 });
    expect(result.level).toBe(16);
    expect(result.milestone).toBe(500);
  });

  it("should ensure mastery title list is correctly parsed and indexed", () => {
    const result = CalculateLevelMilestones({ totalScore: 5000000 });
    expect(result.mastery).toBe("Letter Learner");
  });

  it("should correctly calculate levels and milestones for edge case of maximum score in last range before cap", () => {
    const result = CalculateLevelMilestones({
      totalScore: Number.MAX_SAFE_INTEGER - 1,
    });
    expect(result.level).toBe(99999);
    expect(result.milestone).toBe(0);
  });
});
