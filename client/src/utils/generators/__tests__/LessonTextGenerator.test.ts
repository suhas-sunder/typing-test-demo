import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonTextGenerator from "../LessonTextGenerator";

describe("generates correct text for lessons", () => {
  it("should generate text with correct length based on lessonIndex", () => {
    const characters = "abc";
    const lessonIndex = 2;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(result.replace(/ /g, "").length).toBeGreaterThan(
      70 * 5 * (lessonIndex + 1),
    );
  });

  it("should generate words with varying lengths", () => {
    const characters = "abc";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    const words = result.trim().split(" ");
    const wordLengths = words.map((word) => word.length);
    expect(new Set(wordLengths).size).toBeGreaterThan(1);
  });

  it("should add spaces between words", () => {
    const characters = "abc";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(result.includes(" ")).toBe(true);
  });

  it("should handle typical character sets correctly", () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(
      [...result.replace(/ /g, "")].every((char) => characters.includes(char)),
    ).toBe(true);
  });

  it("should handle negative lessonIndex", () => {
    const characters = "abc";
    const lessonIndex = -1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(result).toBe("");
  });

  it("should handle characters string with special characters", () => {
    const characters = "!@#";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(
      [...result.replace(/ /g, "")].every((char) => characters.includes(char)),
    ).toBe(true);
  });

  it("should generate text with consistent word length distribution", () => {
    const characters = "abc";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    const words = result.trim().split(" ");
    expect(words.length).toBeGreaterThan(0);
  });

  it("should ensure no trailing space at the end of the generated text", () => {
    const characters = "abc";
    const lessonIndex = 1;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(result.endsWith(" ")).toBe(false);
  });

  it("should handle very large lessonIndex values", () => {
    const characters = "abc";
    const lessonIndex = 1000;
    const result = LessonTextGenerator({ characters, lessonIndex });
    expect(result.replace(/ /g, "").length).toBeGreaterThan(
      70 * 5 * (lessonIndex + 1),
    );
  });
});
