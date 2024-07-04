import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonAdvancedData from "../LessonAdvancedData";

const data = LessonAdvancedData();

describe("should render defaults", () => {
  it("should return an object with the correct structure", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
    expect(Array.isArray(data.lessonData)).toBe(true);
  });

  it("should contain correct sectionTitle and sectionId for each section", () => {
    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
    });
  });

  it("should contain correct id and levelTitle in sectionData arrays", () => {
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((entry) => {
        expect(entry).toHaveProperty("id");
        expect(entry).toHaveProperty("levelTitle");
      });
    });
  });

  it("should include all predefined sections in the lessonData array", () => {
    expect(data.lessonData.length).toBe(5);
    expect(data.lessonData[0].sectionTitle).toBe("Number Row");
    expect(data.lessonData[1].sectionTitle).toBe("Brackets");
    expect(data.lessonData[2].sectionTitle).toBe("Symbols");
    expect(data.lessonData[3].sectionTitle).toBe("Letters, Numbers, & Symbols");
    expect(data.lessonData[4].sectionTitle).toBe("Tricky Words");
  });

  it("should handle missing sectionData arrays within sections", () => {
    data.lessonData.forEach((section) => {
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("sectionId");
      expect(Array.isArray(section.sectionData)).toBe(true);
    });
  });

  it("should handle missing id or levelTitle within sectionData entries", () => {
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((entry) => {
        expect(entry).toHaveProperty("id");
        expect(entry).toHaveProperty("levelTitle");
      });
    });
  });

  it("should ensure all sectionData arrays are non-empty", () => {
    data.lessonData.forEach((section) => {
      expect(Array.isArray(section.sectionData)).toBe(true);
      expect(section.sectionData.length).toBeGreaterThan(0);
    });
  });

  it("should verify the uniqueness of ids within sectionData arrays", () => {
    const ids = new Set();
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((data) => {
        expect(ids.has(data.id)).toBe(false);
        ids.add(data.id);
      });
    });
  });

  it("should check for specific section titles", () => {
    const sectionTitles = data.lessonData.map(
      (section) => section.sectionTitle,
    );
    expect(sectionTitles).toContain("Number Row");
    expect(sectionTitles).toContain("Symbols");
  });

  it("should validate id format for each sectionData in lessonData", () => {
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((data) => {
        expect(data.id).toMatch(/^[a-z0-9-]+$/);
      });
    });
  });

  it('should ensure title field is set to "Advanced"', () => {
    expect(data.title).toEqual("Advanced");
  });
});
