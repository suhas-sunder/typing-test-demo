import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LearnPgData from "../LearnPgData";

const data = LearnPgData();

describe("should render defaults", () => {
  it("should return an array of objects when invoked", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(typeof item).toBe("object");
    });
  });

  it("should ensure no objects are missing any properties", () => {
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("details");
    });
  });

  it("should have non-empty id property for each object in the array", () => {
    data.forEach((item) => {
      expect(typeof item.id).toBe("string");
      expect(item.id.length).toBeGreaterThan(0);
    });
  });

  it("should check if each object in the array has id, title, and details properties", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("details");
    });
  });

  it("should have a non-empty title property for each object", () => {
    data.forEach((item) => {
      expect(item.title).toBeTruthy();
      expect(typeof item.title).toBe("string");
    });
  });

  it("should have details property as an array when invoked", () => {
    data.forEach((item) => {
      expect(Array.isArray(item.details)).toBe(true);
    });
  });

  it("should have exactly 7 objects in the array", () => {
    expect(data.length).toBe(7);
  });

  it("should have unique id properties", () => {
    const ids = data.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have non-null details arrays when invoked", () => {
    data.forEach((item) => {
      expect(Array.isArray(item.details)).toBe(true);
      expect(item.details.every((detail) => detail !== null)).toBe(true);
    });
  });

  it("should have unique titles for each object", () => {
    const titles = data.map((item) => item.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it("should return an array of objects when invoked", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(typeof item).toBe("object");
    });
  });

  it("should return an array of objects when invoked", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(typeof item).toBe("object");
    });
  });

  it("should not throw any errors when invoked", () => {
    expect(() => LearnPgData()).not.toThrow();
  });
});
