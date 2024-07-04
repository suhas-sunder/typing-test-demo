import { it, expect } from "vitest";
import ProfilePgLinks from "../ProfilePgLinks";

const data = ProfilePgLinks();

describe("should render defaults", () => {
  it("should return an array of objects with correct structure", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("img");
      expect(item).toHaveProperty("webpImgSrc");
      expect(item).toHaveProperty("link");
      expect(item).toHaveProperty("text");
    });
  });

  it("should contain img, webpImgSrc, link, and text properties in each object", () => {
    data.forEach((item) => {
      expect(item).toHaveProperty("img");
      expect(item).toHaveProperty("webpImgSrc");
      expect(item).toHaveProperty("link");
      expect(item).toHaveProperty("text");
    });
  });

  it("should contain alt and src properties in img property", () => {
    data.forEach((item) => {
      expect(item.img).toHaveProperty("alt");
      expect(item.img).toHaveProperty("src");
    });
  });

  it("should have a valid URL in webpImgSrc property", () => {
    data.forEach((item) => {
      expect(item.webpImgSrc).toMatch(/^https?:\/\/[^\s$.?#].[^\s]*$/);
    });
  });

  it("should have a valid URL path in link property", () => {
    data.forEach((item) => {
      expect(item.link).toMatch(/^\/[a-zA-Z0-9-_/]*$/);
    });
  });

  it("should have a non-empty string in text property", () => {
    data.forEach((item) => {
      expect(typeof item.text).toBe("string");
      expect(item.text.length).toBeGreaterThan(0);
    });
  });

  it("should ensure img.alt and img.src are non-empty strings", () => {
    data.forEach((item) => {
      expect(typeof item.img.alt).toBe("string");
      expect(item.img.alt.length).toBeGreaterThan(0);
      expect(typeof item.img.src).toBe("string");
      expect(item.img.src.length).toBeGreaterThan(0);
    });
  });

  it("should validate webpImgSrc URL format", () => {
    data.forEach((item) => {
      expect(item.webpImgSrc).toMatch(/^https?:\/\/[^\s$.?#].[^\s]*$/);
    });
  });

  it("should validate link URL path format", () => {
    data.forEach((item) => {
      expect(item.link).toMatch(/^\/[a-zA-Z0-9-_/]*$/);
    });
  });

  it("should ensure text follows a specific pattern or format", () => {
    data.forEach((item) => {
      expect(item.text).toMatch(/^- .+ -$/);
    });
  });

  it("should check for duplicate entries in the array", () => {
    const uniqueItems = new Set(data);
    expect(uniqueItems.size).toBe(data.length);
  });
});
