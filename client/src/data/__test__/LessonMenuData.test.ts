import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonMenuData from "../LessonMenuData";

const data = LessonMenuData();

describe("should render defaults", () => {
  it("should return an array of menu items", () => {
    expect(Array.isArray(data)).toBe(true);
  });

  it("should have id, title, icon, and url for each menu item", () => {
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("url");
    });
  });

  it("should have correct ids for menu items", () => {
    const expectedIds = [
      "beginner-id",
      "intermediate-id",
      "advanced-id",
      "graduation-id",
      "quotes-id",
      "common-words-facts-id",
      "animals-facts-id",
      "birds-facts-id",
      "insects-facts-id",
      "prehistoric-facts-id",
      "reptiles-facts-id",
      "fantasy-facts-id",
      "sea-life-id",
      "dogs-facts-id",
      "flowers-facts-id",
    ];
    data.forEach((item, index) => {
      expect(item.id).toBe(expectedIds[index]);
    });
  });

  it("should have correct titles for menu items", () => {
    const expectedTitles = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Graduation",
      "Quotes",
      "Common Words",
      "Animals",
      "Birds",
      "Insects",
      "Prehistoric",
      "Reptiles",
      "Fantasy",
      "Sea Life",
      "Dogs",
      "Flowers",
    ];
    data.forEach((item, index) => {
      expect(item.title).toBe(expectedTitles[index]);
    });
  });

  it("should have correct icons for menu items", () => {
    const expectedIcons = [
      "face",
      "face",
      "face",
      "graduationHat",
      "quote",
      "azLetters",
      "mouse",
      "bird",
      "bee",
      "grass",
      "eye",
      "movie",
      "sailing",
      "paw",
      "flower",
    ];
    data.forEach((item, index) => {
      expect(item.icon).toBe(expectedIcons[index]);
    });
  });

  it("should have correct urls for menu items", () => {
    const expectedUrls = [
      "/lessons/beginner",
      "/lessons/intermediate",
      "/lessons/advanced",
      "/lessons/graduation",
      "/lessons/quotes",
      "/lessons/common-english-words",
      "/lessons/animal-facts",
      "/lessons/bird-facts",
      "/lessons/insect-facts",
      "/lessons/prehistoric-facts",
      "/lessons/reptile-facts",
      "/lessons/fantasy-facts",
      "/lessons/sea-life-facts",
      "/lessons/dog-facts",
      "/lessons/flower-facts",
    ];
    data.forEach((item, index) => {
      expect(item.url).toBe(expectedUrls[index]);
    });
  });

  it("should not return an empty array", () => {
    expect(data.length).toBeGreaterThan(0);
  });

  it("should have unique ids for all menu items", () => {
    const ids = data.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have non-empty titles for all menu items", () => {
    data.forEach((item) => {
      expect(item.title).not.toBe("");
    });
  });

  it("should have valid url formats for all menu items", () => {
    const urlPattern = /^\/lessons\/[a-z-]+$/;
    data.forEach((item) => {
      expect(urlPattern.test(item.url)).toBe(true);
    });
  });
  it("should have valid icon names for all menu items", async () => {
    const validIcons = [
      "face",
      "graduationHat",
      "quote",
      "azLetters",
      "mouse",
      "flower",
      "sailing",
      "eye",
      "grass",
      "movie",
      "bee",
      "bird",
      "paw",
    ];
    data.forEach((item) => {
      expect(validIcons.includes(item.icon)).toBe(true);
    });
  });

  it("should return the expected number of menu items", () => {
    expect(data.length).toBe(15);
  });

  it("should not contain additional properties in menu items", () => {
    data.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys.length).toBe(4);
      expect(keys).toEqual(
        expect.arrayContaining(["id", "title", "icon", "url"]),
      );
    });
  });

  it("should return menu items in the correct order", () => {
    const expectedOrder = [
      "beginner-id",
      "intermediate-id",
      "advanced-id",
      "graduation-id",
      "quotes-id",
      "common-words-facts-id",
      "animals-facts-id",
      "birds-facts-id",
      "insects-facts-id",
      "prehistoric-facts-id",
      "reptiles-facts-id",
      "fantasy-facts-id",
      "sea-life-id",
      "dogs-facts-id",
      "flowers-facts-id",
    ];
    data.forEach((item, index) => {
      expect(item.id).toBe(expectedOrder[index]);
    });
  });
});
