import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import HomePgLinks from "../HomePgLinks";

const data = HomePgLinks();

describe("should render defaults", () => {
  it("should return an array of objects with correct structure when data is available", () => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    data.forEach((item) => {
      expect(item).toHaveProperty("img");
      expect(item.img).toHaveProperty("alt");
      expect(item.img).toHaveProperty("src");
      expect(item).toHaveProperty("webpImgSrc");
      expect(item).toHaveProperty("link");
      expect(item).toHaveProperty("text");
    });
  });

  it('should have "alt" and "src" properties in "img" object for each item', () => {
    data.forEach((item) => {
      expect(item.img).toHaveProperty("alt");
      expect(item.img).toHaveProperty("src");
    });
  });

  it("should validate webpImgSrc property as a valid URL", () => {
    data.forEach((item) => {
      expect(item.webpImgSrc).toMatch(/^https?:\/\/[^\s$.?#].[^\s]*$/);
    });
  });

  it("should ensure img.alt and img.src are non-empty strings", () => {
    data.forEach((item) => {
      expect(typeof item.img.alt).toBe("string");
      expect(item.img.alt.trim()).not.toBe("");
      expect(typeof item.img.src).toBe("string");
      expect(item.img.src.trim()).not.toBe("");
    });
  });

  it("should validate webpImgSrc is a non-empty string", () => {
    data.forEach((item) => {
      expect(typeof item.webpImgSrc).toBe("string");
      expect(item.webpImgSrc.length).toBeGreaterThan(0);
    });
  });

  it("should validate link is a non-empty string", () => {
    data.forEach((item) => {
      expect(typeof item.link).toBe("string");
      expect(item.link.length).toBeGreaterThan(0);
    });
  });

  it("should validate that text is a non-empty string", () => {
    data.forEach((item) => {
      expect(typeof item.text).toBe("string");
      expect(item.text.length).toBeGreaterThan(0);
    });
  });

  it("should not have duplicate links in the returned array", () => {
    const links = data.map((item) => item.link);
    const uniqueLinks = new Set(links);
    expect(uniqueLinks.size).toBe(links.length);
  });
});
