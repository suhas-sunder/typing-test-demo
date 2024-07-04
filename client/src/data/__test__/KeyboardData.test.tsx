import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import KeyboardData from "../KeyboardData";

const keyboardData = KeyboardData();

describe("should render defaults", () => {
  it("should return an object with five rows of keys when called", () => {
    expect(Object.keys(keyboardData)).toHaveLength(5);
    expect(keyboardData).toHaveProperty("firstRowKeys");
    expect(keyboardData).toHaveProperty("secondRowKeys");
    expect(keyboardData).toHaveProperty("thirdRowKeys");
    expect(keyboardData).toHaveProperty("fourthRowKeys");
    expect(keyboardData).toHaveProperty("fifthRowKeys");
  });

  it("should have the correct number of keys in first row", () => {
    expect(keyboardData.firstRowKeys).toHaveLength(14);
  });

  it("should have the correct number of keys in second row", () => {
    expect(keyboardData.secondRowKeys).toHaveLength(14);
  });
  it("should have the correct number of keys in third row", () => {
    expect(keyboardData.thirdRowKeys).toHaveLength(13);
  });
  it("should have the correct number of keys in fourth row", () => {
    expect(keyboardData.fourthRowKeys).toHaveLength(12);
  });
  it("should have the correct number of keys in fifth row", () => {
    expect(keyboardData.fifthRowKeys).toHaveLength(8);
  });
  it("should have correct default and shift values for keys in the first row", () => {
    const firstRowKeys = keyboardData.firstRowKeys;
    firstRowKeys.forEach((key) => {
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have id, defaultKey, and shiftKey properties for first row", () => {
    keyboardData.firstRowKeys.forEach((key) => {
      expect(key).toHaveProperty("id");
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have id, defaultKey, and shiftKey properties for second row", () => {
    keyboardData.secondRowKeys.forEach((key) => {
      expect(key).toHaveProperty("id");
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have id, defaultKey, and shiftKey properties for third row", () => {
    keyboardData.thirdRowKeys.forEach((key) => {
      expect(key).toHaveProperty("id");
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have id, defaultKey, and shiftKey properties for fourth row", () => {
    keyboardData.fourthRowKeys.forEach((key) => {
      expect(key).toHaveProperty("id");
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have id, defaultKey, and shiftKey properties for fifth row", () => {
    keyboardData.fifthRowKeys.forEach((key) => {
      expect(key).toHaveProperty("id");
      expect(key).toHaveProperty("defaultKey");
      expect(key).toHaveProperty("shiftKey");
    });
  });

  it("should have correct default and shift values for keys in the fifth row", () => {
    const fifthRowKeys = keyboardData.fifthRowKeys;
    expect(fifthRowKeys[0]).toEqual({
      id: "fifthRow-firstKey",
      defaultKey: "Ctrl",
      shiftKey: "",
    });
    expect(fifthRowKeys[1]).toEqual({
      id: "fifthRow-secondKey",
      defaultKey: "Option",
      shiftKey: "",
    });
    expect(fifthRowKeys[2]).toEqual({
      id: "fifthRow-thirdKey",
      defaultKey: "Alt",
      shiftKey: "",
    });
    expect(fifthRowKeys[3]).toEqual({
      id: "fifthRow-fourthKey",
      defaultKey: " ",
      shiftKey: "",
    });
    expect(fifthRowKeys[4]).toEqual({
      id: "fifthRow-fifthKey",
      defaultKey: "Alt",
      shiftKey: "",
    });
    expect(fifthRowKeys[5]).toEqual({
      id: "fifthRow-sixthKey",
      defaultKey: "Fn",
      shiftKey: "",
    });
    expect(fifthRowKeys[6]).toEqual({
      id: "fifthRow-seventhKey",
      defaultKey: "Menu",
      shiftKey: "",
    });
    expect(fifthRowKeys[7]).toEqual({
      id: "fifthRow-eighthKey",
      defaultKey: "Ctrl",
      shiftKey: "",
    });
  });

  it("should not have duplicate key ids across all rows", () => {
    const allKeys = [
      ...keyboardData.firstRowKeys,
      ...keyboardData.secondRowKeys,
      ...keyboardData.thirdRowKeys,
      ...keyboardData.fourthRowKeys,
      ...keyboardData.fifthRowKeys,
    ];
    const keyIds = allKeys.map((key) => key.id);
    const uniqueKeyIds = new Set(keyIds);
    expect(uniqueKeyIds.size).toBe(keyIds.length);
  });

  it("should have consistent key object structure when called", () => {
    const keys = Object.keys(keyboardData);
    expect(keys).toHaveLength(5);
    keys.forEach((row) => {
      expect(keyboardData).toHaveProperty(`${row}`);
      expect(keyboardData[row]).toBeInstanceOf(Array);
      keyboardData[row].forEach((key) => {
        expect(key).toHaveProperty("id");
        expect(key).toHaveProperty("defaultKey");
        expect(key).toHaveProperty("shiftKey");
      });
    });
  });

  it("should correctly represent the space key", () => {
    const fifthRowKeys = keyboardData.fifthRowKeys;
    const spaceKey = fifthRowKeys.find((key) => key.defaultKey === " ");
    expect(spaceKey).toBeDefined();
    expect(spaceKey?.defaultKey).toBe(" ");
    expect(spaceKey?.shiftKey).toBe("");
  });

  it("should have correct default and shift values for keys in the second row", () => {
    const secondRowKeys = keyboardData.secondRowKeys;
    expect(secondRowKeys[0]).toEqual({
      id: "secondRow-firstKey",
      defaultKey: "Tab",
      shiftKey: "",
    });
    expect(secondRowKeys[1]).toEqual({
      id: "secondRow-secondKey",
      defaultKey: "q",
      shiftKey: "",
    });
    expect(secondRowKeys[2]).toEqual({
      id: "secondRow-thirdKey",
      defaultKey: "w",
      shiftKey: "",
    });
    expect(secondRowKeys[3]).toEqual({
      id: "secondRow-fourthKey",
      defaultKey: "e",
      shiftKey: "",
    });
    expect(secondRowKeys[4]).toEqual({
      id: "secondRow-fifthKey",
      defaultKey: "r",
      shiftKey: "",
    });
    expect(secondRowKeys[5]).toEqual({
      id: "secondRow-sixthKey",
      defaultKey: "t",
      shiftKey: "",
    });
    expect(secondRowKeys[6]).toEqual({
      id: "secondRow-seventhKey",
      defaultKey: "y",
      shiftKey: "",
    });
    expect(secondRowKeys[7]).toEqual({
      id: "secondRow-eighthKey",
      defaultKey: "u",
      shiftKey: "",
    });
    expect(secondRowKeys[8]).toEqual({
      id: "secondRow-ninthKey",
      defaultKey: "i",
      shiftKey: "",
    });
    expect(secondRowKeys[9]).toEqual({
      id: "secondRow-tenthKey",
      defaultKey: "o",
      shiftKey: "",
    });
    expect(secondRowKeys[10]).toEqual({
      id: "secondRow-eleventhKey",
      defaultKey: "p",
      shiftKey: "",
    });
    expect(secondRowKeys[11]).toEqual({
      id: "secondRow-twelfthKey",
      defaultKey: "[",
      shiftKey: "{",
    });
    expect(secondRowKeys[12]).toEqual({
      id: "secondRow-thirteenthKey",
      defaultKey: "]",
      shiftKey: "}",
    });
    expect(secondRowKeys[13]).toEqual({
      id: "secondRow-fourteenthKey",
      defaultKey: "\\",
      shiftKey: "|",
    });
  });

  it("should have correct default and shift values for keys in the fourth row", () => {
    const fourthRowKeys = keyboardData.fourthRowKeys;
    expect(fourthRowKeys[0]).toEqual({
      id: "fourthRow-firstKey",
      defaultKey: "Shift",
      shiftKey: "",
    });
    expect(fourthRowKeys[1]).toEqual({
      id: "fourthRow-secondKey",
      defaultKey: "z",
      shiftKey: "",
    });
    expect(fourthRowKeys[2]).toEqual({
      id: "fourthRow-thirdKey",
      defaultKey: "x",
      shiftKey: "",
    });
    expect(fourthRowKeys[3]).toEqual({
      id: "fourthRow-fourthKey",
      defaultKey: "c",
      shiftKey: "",
    });
    expect(fourthRowKeys[4]).toEqual({
      id: "fourthRow-fifthKey",
      defaultKey: "v",
      shiftKey: "",
    });
    expect(fourthRowKeys[5]).toEqual({
      id: "fourthRow-sixthKey",
      defaultKey: "b",
      shiftKey: "",
    });
    expect(fourthRowKeys[6]).toEqual({
      id: "fourthRow-seventhKey",
      defaultKey: "n",
      shiftKey: "",
    });
    expect(fourthRowKeys[7]).toEqual({
      id: "fourthRow-eighthKey",
      defaultKey: "m",
      shiftKey: "",
    });
    expect(fourthRowKeys[8]).toEqual({
      id: "fourthRow-ninthKey",
      defaultKey: ",",
      shiftKey: "<",
    });
    expect(fourthRowKeys[9]).toEqual({
      id: "fourthRow-tenthKey",
      defaultKey: ".",
      shiftKey: ">",
    });
    expect(fourthRowKeys[10]).toEqual({
      id: "fourthRow-eleventhKey",
      defaultKey: "/",
      shiftKey: "?",
    });
    expect(fourthRowKeys[11]).toEqual({
      id: "fourthRow-twelfthKey",
      defaultKey: "Shift",
      shiftKey: "",
    });
  });

  it("should verify the order of keys within first row", () => {
    expect(keyboardData.firstRowKeys.map((key) => key.id)).toEqual([
      "firstRow-firstKey",
      "firstRow-secondKey",
      "firstRow-thirdKey",
      "firstRow-fourthKey",
      "firstRow-fifthKey",
      "firstRow-sixthKey",
      "firstRow-seventhKey",
      "firstRow-eighthKey",
      "firstRow-ninthKey",
      "firstRow-tenthKey",
      "firstRow-eleventhKey",
      "firstRow-twelfthKey",
      "firstRow-thirteenthKey",
      "firstRow-fourteenthKey",
    ]);
  });

  it("should verify the order of keys within second row", () => {
    expect(keyboardData.secondRowKeys.map((key) => key.id)).toEqual([
      "secondRow-firstKey",
      "secondRow-secondKey",
      "secondRow-thirdKey",
      "secondRow-fourthKey",
      "secondRow-fifthKey",
      "secondRow-sixthKey",
      "secondRow-seventhKey",
      "secondRow-eighthKey",
      "secondRow-ninthKey",
      "secondRow-tenthKey",
      "secondRow-eleventhKey",
      "secondRow-twelfthKey",
      "secondRow-thirteenthKey",
      "secondRow-fourteenthKey",
    ]);
  });

  it("should verify the order of keys within third row", () => {
    expect(keyboardData.thirdRowKeys.map((key) => key.id)).toEqual([
      "thirdRow-firstKey",
      "thirdRow-secondKey",
      "thirdRow-thirdKey",
      "thirdRow-fourthKey",
      "thirdRow-fifthKey",
      "thirdRow-sixthKey",
      "thirdRow-seventhKey",
      "thirdRow-eighthKey",
      "thirdRow-ninthKey",
      "thirdRow-tenthKey",
      "thirdRow-eleventhKey",
      "thirdRow-twelfthKey",
      "thirdRow-thirteenthKey",
    ]);
  });

  it("should verify the order of keys within fourth row", () => {
    expect(keyboardData.fourthRowKeys.map((key) => key.id)).toEqual([
      "fourthRow-firstKey",
      "fourthRow-secondKey",
      "fourthRow-thirdKey",
      "fourthRow-fourthKey",
      "fourthRow-fifthKey",
      "fourthRow-sixthKey",
      "fourthRow-seventhKey",
      "fourthRow-eighthKey",
      "fourthRow-ninthKey",
      "fourthRow-tenthKey",
      "fourthRow-eleventhKey",
      "fourthRow-twelfthKey",
    ]);
  });

  it("should verify the order of keys within fifth row", () => {
    expect(keyboardData.fifthRowKeys.map((key) => key.id)).toEqual([
      "fifthRow-firstKey",
      "fifthRow-secondKey",
      "fifthRow-thirdKey",
      "fifthRow-fourthKey",
      "fifthRow-fifthKey",
      "fifthRow-sixthKey",
      "fifthRow-seventhKey",
      "fifthRow-eighthKey",
    ]);
  });
});
