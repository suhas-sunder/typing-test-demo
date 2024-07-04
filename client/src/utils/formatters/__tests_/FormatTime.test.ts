import { describe, it, expect } from "vitest";
import FormatTime from "../FormatTime";

describe("return correct value", () => {
  it("should convert total seconds to correct hours, minutes, and seconds", () => {
    const result = FormatTime(3661);
    expect(result).toEqual({ hours: "01", minutes: "01", seconds: "01" });
  });

  it("should handle typical input values like 3600, 3661, 59", () => {
    expect(FormatTime(3600)).toEqual({
      hours: "01",
      minutes: "00",
      seconds: "00",
    });
    expect(FormatTime(3661)).toEqual({
      hours: "01",
      minutes: "01",
      seconds: "01",
    });
    expect(FormatTime(59)).toEqual({
      hours: "00",
      minutes: "00",
      seconds: "59",
    });
  });

  it("should format single-digit hours, minutes, and seconds with leading zeros", () => {
    const result = FormatTime(3661);
    expect(result).toEqual({ hours: "01", minutes: "01", seconds: "01" });
  });

  it("should return an object with hours, minutes, and seconds properties", () => {
    const result = FormatTime(3661);
    expect(result).toHaveProperty("hours");
    expect(result).toHaveProperty("minutes");
    expect(result).toHaveProperty("seconds");
  });

  it("should handle zero seconds input correctly", () => {
    const result = FormatTime(0);
    expect(result).toEqual({ hours: "00", minutes: "00", seconds: "00" });
  });

  it("should handle maximum possible integer value for totalTimeSec", () => {
    const maxInt = Number.MAX_SAFE_INTEGER;
    const result = FormatTime(maxInt);
    expect(result.hours).toBeDefined();
    expect(result.minutes).toBeDefined();
    expect(result.seconds).toBeDefined();
  });

  it("should handle negative values for totalTimeSec", () => {
    const result = FormatTime(-3661);
    expect(result).toEqual({ hours: "02", minutes: "02", seconds: "01" });
  });

  it("should handle non-integer values for totalTimeSec", () => {
    const result = FormatTime(3661.5);
    expect(result).toEqual({ hours: "01", minutes: "01", seconds: "01" });
  });

  it("should handle very large values for totalTimeSec", () => {
    const largeValue = 999999999;
    const result = FormatTime(largeValue);
    expect(result.hours).toBeDefined();
    expect(result.minutes).toBeDefined();
    expect(result.seconds).toBeDefined();
  });

  it("should ensure no grouping in formatted output", () => {
    const result = FormatTime(10000);
    expect(result.hours).not.toContain(",");
    expect(result.minutes).not.toContain(",");
    expect(result.seconds).not.toContain(",");
  });

  it("should check for performance with large inputs", () => {
    const start = performance.now();
    FormatTime(Number.MAX_SAFE_INTEGER);
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Ensure it runs within 100ms
  });

  it("should validate output format consistency", () => {
    const result1 = FormatTime(3661);
    const result2 = FormatTime(3661);
    expect(result1).toEqual(result2);
  });

  it("should ensure function is pure and has no side effects", () => {
    const initialResult = FormatTime(3661);
    FormatTime(7200); // Call with different value
    const finalResult = FormatTime(3661);
    expect(initialResult).toEqual(finalResult);
  });

  it("should handle edge case of one second less than an hour (3599)", () => {
    const result = FormatTime(3599);
    expect(result).toEqual({ hours: "00", minutes: "59", seconds: "59" });
  });

  it("should handle edge case of one second more than an hour (3601)", () => {
    const result = FormatTime(3601);
    expect(result).toEqual({ hours: "01", minutes: "00", seconds: "01" });
  });

  it("should handle edge case of one second less than a minute (59)", () => {
    const result = FormatTime(59);
    expect(result).toEqual({ hours: "00", minutes: "00", seconds: "59" });
  });

  it("should handle edge case of one second more than a minute (61)", () => {
    const result = FormatTime(61);
    expect(result).toEqual({ hours: "00", minutes: "01", seconds: "01" });
  });

  it("should handle edge case of exactly one hour (3600)", () => {
    const result = FormatTime(3600);
    expect(result).toEqual({ hours: "01", minutes: "00", seconds: "00" });
  });
});
