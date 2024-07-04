import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateRandNum from "../GenerateRandNum";

describe("return correct value", () => {
  it("should return a random number less than or equal to 5", () => {
    const max = 5;
    const randNum = GenerateRandNum({ max });
    expect(randNum).toBeLessThanOrEqual(5);
  });

  it("should return a number between 0 and max-1 when max is a positive integer", () => {
    const max = 10;
    const result = GenerateRandNum({ max });
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
  });

  it("should return 0 when max is 1", () => {
    const max = 1;
    const result = GenerateRandNum({ max });
    expect(result).toBe(0);
  });

  it("should return NaN when max is 0", () => {
    const max = 0;
    const result = GenerateRandNum({ max });
    expect(result).toBe(0);
  });

  it("should handle negative max values gracefully", () => {
    const max = -5;
    const result = GenerateRandNum({ max });
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("should handle non-integer max values by ceiling them", () => {
    const max = 5.7;
    const result = GenerateRandNum({ max });
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(Math.ceil(max));
  });

  it("should handle very large max values without performance issues", () => {
    const max = Number.MAX_SAFE_INTEGER;
    const startTime = performance.now();
    const result = GenerateRandNum({ max });
    const endTime = performance.now();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
    expect(endTime - startTime).toBeLessThan(100); // Ensure it runs within 100ms
  });

  it("should handle max as a floating-point number", () => {
    const max = 10.5;
    const result = GenerateRandNum({ max });
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(Math.ceil(max));
  });
});
