import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import ManipulateString from "../ManipulateString";

describe("return correct value", () => {
  it("should remove whitespaces from string", () => {
    const textToBeManipulated = "hello world";
    const option = "no whitespace";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("helloworld");
  });

  it("should return all lower case", () => {
    const textToBeManipulated = "HELLO World";
    const option = "all lower case";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("hello world");
  });

  it("should return all upper case", () => {
    const textToBeManipulated = "HELLO World";
    const option = "ALL UPPER CASE";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("HELLO WORLD");
  });

  it("should remove all punctuation", () => {
    const textToBeManipulated = "hello_world?!#$!$%@^^&&^%**()[]{}";
    const option = "no punctuation";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("helloworld");
  });

  it("should return pascal case", () => {
    const textToBeManipulated = "hello";
    const option = "PascalCase";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("HelloHelloHelloHello");
  });

  it('should convert text to lowercase when option is "all lower case"', () => {
    const result = ManipulateString({
      textToBeManipulated: "Hello World",
      option: "all lower case",
    });
    expect(result).toBe("hello world");
  });

  it('should remove whitespace when option is "no whitespace"', () => {
    const result = ManipulateString({
      textToBeManipulated: "Hello World",
      option: "no whitespace",
    });
    expect(result).toBe("HelloWorld");
  });

  it('should convert text to uppercase when option is "ALL UPPER CASE"', () => {
    const result = ManipulateString({
      textToBeManipulated: "Hello World",
      option: "ALL UPPER CASE",
    });
    expect(result).toBe("HELLO WORLD");
  });

  it('should remove punctuation when option is "no punctuation"', () => {
    const result = ManipulateString({
      textToBeManipulated: "Hello, World!",
      option: "no punctuation",
    });
    expect(result).toBe("Hello World");
  });

  it('should apply PascalCase transformation to random words when option is "PascalCase"', () => {
    const result = ManipulateString({
      textToBeManipulated: "hello world",
      option: "PascalCase",
    });
    expect(result).toMatch(/([A-Z][a-z]*[A-Z][a-z]*)/);
  });

  it('should apply camelCase transformation to random words when option is "camelCase"', () => {
    const result = ManipulateString({
      textToBeManipulated: "hello world",
      option: "camelCase",
    });
    expect(result).toMatch(/([a-z]+[A-Z][a-z]*)/);
  });

  it('should apply MiXeDcAsE transformation to random words when option is "MiXeDcAsE"', () => {
    const result = ManipulateString({
      textToBeManipulated: "hello world",
      option: "MiXeDcAsE",
    });
    expect(result).toMatch(/([A-Za-z]+)/);
  });

  it('should apply snake_case transformation to random words when option is "snake_case"', () => {
    const result = ManipulateString({
      textToBeManipulated: "hello world",
      option: "snake_case",
    });
    expect(result).toMatch(/([a-z]+_[a-z]+)/);
  });

  it('should insert random digits into text when option starts with "Digits"', () => {
    const result = ManipulateString({
      textToBeManipulated: "hello world",
      option: "Digits",
    });
    expect(result).toMatch(/\d+/);
  });

  it("should handle empty string input", () => {
    const result = ManipulateString({
      textToBeManipulated: "",
      option: "all lower case",
    });
    expect(result).toBe("");
  });

  it("should handle single character input", () => {
    const result = ManipulateString({
      textToBeManipulated: "A",
      option: "all lower case",
    });
    expect(result).toBe("a");
  });

  it("should handle input with only whitespace", () => {
    const result = ManipulateString({
      textToBeManipulated: "   ",
      option: "no whitespace",
    });
    expect(result).toBe("");
  });

  it("should handle input with only punctuation", () => {
    const result = ManipulateString({
      textToBeManipulated: "!@#$",
      option: "no punctuation",
    });
    expect(result).toBe("");
  });

  it("should handle input with mixed case characters", () => {
    const result = ManipulateString({
      textToBeManipulated: "HeLLo WoRLd",
      option: "all lower case",
    });
    expect(result).toBe("hello world");
  });

  it("should handle input with special characters", () => {
    const result = ManipulateString({
      textToBeManipulated: "@HeLLo# WoRLd$",
      option: "no punctuation",
    });
    expect(result).toBe("HeLLo WoRLd");
  });

  it("should ensure no infinite loops or excessive processing time", () => {
    const startTime = Date.now();
    ManipulateString({
      textToBeManipulated: "Hello World".repeat(1000),
      option: "PascalCase",
    });
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(1000);
  });
});
