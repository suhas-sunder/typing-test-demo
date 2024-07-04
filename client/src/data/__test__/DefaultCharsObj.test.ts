import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import DefaultCharsObj from "../DefaultCharsObj";

const data = DefaultCharsObj();
const expectedKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "/",
  "?",
  ".",
  ",",
  " ",
  "{",
  "}",
  "|",
  ">",
  "<",
  "↵",
];

describe("should render defaults", () => {
  it("should return an object with all specified characters as keys", () => {
    expectedKeys.forEach((key) => {
      expect(data).toHaveProperty(key, 0);
    });
  });

  it("should handle an empty input scenario gracefully", () => {
    const result = DefaultCharsObj();
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });

  it("should return a consistent object structure on multiple calls", () => {
    const result1 = DefaultCharsObj();
    const result2 = DefaultCharsObj();

    expect(result1).toEqual(result2);
  });

  it("should not throw any exceptions when called", () => {
    expect(DefaultCharsObj).not.toThrow();
  });
});
