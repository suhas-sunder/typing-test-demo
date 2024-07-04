import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateCalculations from "../GenerateCalculations";

describe("generates calculations (equations) correctly", () => {
  it("should generate an array of length 13", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    expect(result).toHaveLength(13);
  });

  it("should include operators based on currentLives", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const operators = ["+", "/", "*", "-", "."];
    const hasOperator = result.some((item) => operators.includes(item));
    expect(hasOperator).toBe(true);
  });

  it("should generate random digits between 0 and 9", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const digits = result.filter((item) => !isNaN(Number(item)));
    const allDigitsValid = digits.every(
      (digit) => digit >= "0" && digit <= "9",
    );
    expect(allDigitsValid).toBe(true);
  });

  it("should adjust difficulty based on currentLives", () => {
    const easyResult = GenerateCalculations({ currentLives: 5 });
    const hardResult = GenerateCalculations({ currentLives: 2 });
    expect(
      easyResult.filter((item) => isNaN(Number(item))).length,
    ).toBeLessThan(hardResult.filter((item) => isNaN(Number(item))).length);
  });

  it("should use correct operators for given difficulty", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const validOperators = ["+", "/", "*", "-", "."];
    const invalidOperators = result.filter(
      (item) => isNaN(Number(item)) && !validOperators.includes(item),
    );
    expect(invalidOperators.length).toBe(0);
  });

  it("should handle currentLives of 1 correctly", () => {
    const result = GenerateCalculations({ currentLives: 1 });
    expect(result).toHaveLength(13);
  });

  it("should handle currentLives of 0", () => {
    const result = GenerateCalculations({ currentLives: 0 });
    expect(result).toHaveLength(13);
  });

  it("should handle non-integer currentLives", () => {
    const result = GenerateCalculations({ currentLives: 2.5 });
    expect(result).toHaveLength(13);
  });

  it("should ensure no division by zero in calculations", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const hasDivisionByZero = result.some(
      (item, index) => item === "/" && result[index + 1] === "0",
    );
    expect(hasDivisionByZero).toBe(false);
  });

  it("should verify operators are correctly placed", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const operators = ["+", "/", "*", "-", "."];
    const operatorPositions = result
      .map((item, index) => (operators.includes(item) ? index : -1))
      .filter((index) => index !== -1);
    operatorPositions.forEach((position) => {
      expect(position % (3 - 1)).toBe(1);
    });
  });

  it("should ensure correct number of operators based on difficulty", () => {
    const easyResult = GenerateCalculations({ currentLives: 5 });
    const hardResult = GenerateCalculations({ currentLives: 2 });
    expect(
      easyResult.filter((item) => isNaN(Number(item))).length,
    ).toBeLessThan(hardResult.filter((item) => isNaN(Number(item))).length);
  });

  it("should validate output is a string array", () => {
    const result = GenerateCalculations({ currentLives: 3 });
    const allStrings = result.every((item) => typeof item === "string");
    expect(allStrings).toBe(true);
  });
});
