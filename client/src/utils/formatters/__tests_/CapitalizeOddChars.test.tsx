import { describe, it, expect } from "vitest";
import CapitalizeOddChars from "../CapitalizeOddChars";

describe("return correct value", () => {
  it("should return word with every other letter capitalized", () => {
    const word = "hello";
    let lengthToCapatilize = 1;
    let capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("Hello");

    lengthToCapatilize = 2;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlo");

    lengthToCapatilize = 3;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlo");

    lengthToCapatilize = 4;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlO");
  });

  it("should capitalize characters at odd indices up to the specified length", () => {
    const result = CapitalizeOddChars({
      word: "abcdef",
      lengthToCapatilize: 5,
    });
    expect(result).toBe("AbCdEf");
  });

  it("should return the original word when lengthToCapatilize is 0", () => {
    const result = CapitalizeOddChars({
      word: "abcdef",
      lengthToCapatilize: 0,
    });
    expect(result).toBe("Abcdef");
  });

  it("should handle words with mixed case correctly", () => {
    const result = CapitalizeOddChars({
      word: "aBcDeF",
      lengthToCapatilize: 5,
    });
    expect(result).toBe("ABCDEF");
  });

  it("should process words with special characters and numbers", () => {
    const result = CapitalizeOddChars({
      word: "a1b2c3d4",
      lengthToCapatilize: 7,
    });
    expect(result).toBe("A1B2C3D4");
  });

  it("should return the original word when lengthToCapatilize exceeds word length", () => {
    const result = CapitalizeOddChars({ word: "abc", lengthToCapatilize: 10 });
    expect(result).toBe("AbC");
  });

  it("should handle empty string input", () => {
    const result = CapitalizeOddChars({ word: "", lengthToCapatilize: 5 });
    expect(result).toBe("");
  });

  it("should handle single character word", () => {
    const result = CapitalizeOddChars({ word: "a", lengthToCapatilize: 1 });
    expect(result).toBe("A");
  });

  it("should handle lengthToCapatilize as a negative number", () => {
    const result = CapitalizeOddChars({
      word: "abcdef",
      lengthToCapatilize: -1,
    });
    expect(result).toBe("abcdef");
  });

  it("should handle lengthToCapatilize as a very large number", () => {
    const result = CapitalizeOddChars({
      word: "abcdef",
      lengthToCapatilize: 1000,
    });
    expect(result).toBe("AbCdEf");
  });

  it("should handle non-alphabetic characters in the word", () => {
    const result = CapitalizeOddChars({
      word: "a1!b2@c3#d4$",
      lengthToCapatilize: 11,
    });
    expect(result).toBe("A1!b2@C3#d4$");
  });

  it("should handle words with spaces correctly", () => {
    const result = CapitalizeOddChars({
      word: "a b c d e f",
      lengthToCapatilize: 11,
    });
    expect(result).toBe("A B C D E F");
  });

  it("should process words with punctuation correctly", () => {
    const result = CapitalizeOddChars({
      word: "a.b,c!d?e:f;",
      lengthToCapatilize: 11,
    });
    expect(result).toBe("A.B,C!D?E:F;");
  });

  it("should handle words with Unicode characters", () => {
    const result = CapitalizeOddChars({
      word: "aあbいcうdえeおfか",
      lengthToCapatilize: 11,
    });
    expect(result).toBe("AあBいCうDえEおFか");
  });

  it("should ensure no side effects on input word", () => {
    const inputWord = "abcdef";
    const result = CapitalizeOddChars({
      word: inputWord,
      lengthToCapatilize: 5,
    });
    expect(result).toBe("AbCdEf");
    expect(inputWord).toBe("abcdef");
  });

  it("should capitalize only up to the specified length even if it's an odd index", () => {
    const result = CapitalizeOddChars({
      word: "abcdefg",
      lengthToCapatilize: 4,
    });
    expect(result).toBe("AbCdEfg");
  });

  it("should not capitalize characters beyond the specified length", () => {
    const result = CapitalizeOddChars({
      word: "abcdefghij",
      lengthToCapatilize: 6,
    });
    expect(result).toBe("AbCdEfGhij");
  });

  it("should handle words with mixed case and special characters correctly", () => {
    const result = CapitalizeOddChars({
      word: "aB!cD@eF#",
      lengthToCapatilize: 7,
    });
    expect(result).toBe("AB!cD@EF#");
  });

  it("should handle words with numbers and spaces correctly", () => {
    const result = CapitalizeOddChars({
      word: "a 1 b 2 c 3 d 4 e 5 f 6 g 7 h 8 i 9 j 0 k l m n o p q r s t u v w x y z",
      lengthToCapatilize: 51,
    });
    expect(result).toBe(
      "A 1 B 2 C 3 D 4 E 5 F 6 G 7 H 8 I 9 J 0 K L M N O P q r s t u v w x y z",
    );
  });
});
