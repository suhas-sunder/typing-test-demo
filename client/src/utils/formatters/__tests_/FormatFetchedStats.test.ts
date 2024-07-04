import { describe, it, expect } from "vitest";
import FormatFetchedStats from "../FormatFetchedStats";

describe("return correct value", () => {
  it("should correctly format avgWpm from input data", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.avgWpm).toBe("75");
  });

  it("should correctly calculate and format wordsTyped", () => {
    const data = {
      totalTypingTimeSec: 3660,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.wordsTyped).toBe("75");
  });

  it("should correctly calculate and format totalTypingMins", () => {
    const data = {
      totalTypingTimeSec: 3660,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("01");
  });

  it("should correctly calculate and format totalTypingDays", () => {
    const data = {
      totalTypingTimeSec: 86400,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingDays).toBe("01");
  });

  it("should correctly calculate and format totalTypingHours", () => {
    const data = {
      totalTypingTimeSec: 90000,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingHours).toBe("01");
  });

  it("should correctly format totalScore from input data", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalScore).toBe("1,000");
  });

  it("should handle zero totalTypingTimeSec gracefully", () => {
    const data = {
      totalTypingTimeSec: 0,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("00");
  });

  it("should handle extremely large totalTypingTimeSec values", () => {
    const data = {
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,

      totalTypingTimeSec: Number.MAX_SAFE_INTEGER,
    };
    const result = FormatFetchedStats({ data });
    expect(parseInt(result.totalTypingDays)).toBeGreaterThan(0);
    expect(parseInt(result.totalTypingHours)).toBeGreaterThan(0);
    expect(parseInt(result.totalTypingMins)).toBeGreaterThan(0);
  });

  it("should ensure all formatted numbers use correct locale", () => {
    const data = {
      totalTypingTimeSec: 36000000,
      totalScore: 1000000,
      totalDaysActive: 50000,
      totalKeysPressed: 1000,
      totalChars: 37500,
    };
    const result = FormatFetchedStats({ data });
    expect(result.wordsTyped.split(",").length).toBeGreaterThan(1);
    expect(result.totalScore.split(",").length).toBeGreaterThan(1);
    expect(result.totalTypingMins.split(",").length).toBe(1);
    expect(result.totalTypingDays.split(",").length).toBe(1);
    expect(result.totalTypingHours.split(",").length).toBe(1);
  });

  it("should ensure minimumIntegerDigits formatting is applied correctly", () => {
    const data = {
      totalTypingTimeSec: 3661,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("01");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("01");
  });

  it("should ensure useGrouping is applied correctly", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 100000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalScore).toBe("100,000");
    expect(result.wordsTyped).toBe("75");
  });

  it("should correctly handle zero totalDaysActive", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 1000,
      totalDaysActive: 0,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalDaysActive).toBe("0");
  });

  it("should handle extremely small totalTypingTimeSec values correctly", () => {
    const data = {
      totalTypingTimeSec: 1,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("00");
  });

  it("should correctly calculate and format wordsTyped for large totalChars", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 3750000,
    };
    const result = FormatFetchedStats({ data });
    expect(result.wordsTyped).toBe("750,000");
  });

  it("should handle non-zero totalTypingTimeSec with zero days, hours, and minutes correctly", () => {
    const data = {
      totalTypingTimeSec: 59,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("00");
  });

  it("should handle totalTypingTimeSec exactly one minute correctly", () => {
    const data = {
      totalTypingTimeSec: 60,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("01");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("00");
  });

  it("should handle totalTypingTimeSec exactly one hour correctly", () => {
    const data = {
      totalTypingTimeSec: 3600,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("00");
    expect(result.totalTypingHours).toBe("01");
  });

  it("should handle totalTypingTimeSec exactly one day correctly", () => {
    const data = {
      totalTypingTimeSec: 86400,
      totalScore: 1000,
      totalDaysActive: 5,
      totalChars: 375,
    };
    const result = FormatFetchedStats({ data });
    expect(result.totalTypingMins).toBe("00");
    expect(result.totalTypingDays).toBe("01");
    expect(result.totalTypingHours).toBe("00");
  });
});
