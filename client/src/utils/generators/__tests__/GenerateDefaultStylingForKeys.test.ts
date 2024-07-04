import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateDefaultStylingForKeys from "../GenerateDefaultStylingForKeys";

describe("generates styling correctly", () => {
  it("should return an object with keys from keyArr and values as styling", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: ["a", "b"],
      styling: "default",
    });
    expect(result).toEqual({ a: "default", b: "default" });
  });

  it("should handle keyArr with string elements correctly", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: ["a", "b"],
      styling: "default",
    });
    expect(result).toEqual({ a: "default", b: "default" });
  });

  it("should return an empty object when keyArr is empty", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: [],
      styling: "default",
    });
    expect(result).toEqual({});
  });

  it("should handle keyArr with duplicate keys", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: ["a", "a"],
      styling: "default",
    });
    expect(result).toEqual({ a: "default" });
  });

  it("should handle styling as an empty string", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: ["a"],
      styling: "",
    });
    expect(result).toEqual({ a: "" });
  });

  it("should handle keyArr with boolean string keys", () => {
    const result = GenerateDefaultStylingForKeys({
      keyArr: ["true", "false"],
      styling: "default",
    });
    expect(result).toEqual({ true: "default", false: "default" });
  });
});
