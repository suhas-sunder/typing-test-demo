import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonBeginnerData from "../LessonBeginnerData";

const data = LessonBeginnerData();

describe("should render defaults", () => {
  it("should return correct structure for LessonDataType", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
  });

  it("should include all expected sections and their titles", () => {
    const sectionTitles = data.lessonData.map(
      (section) => section.sectionTitle,
    );
    expect(sectionTitles).toEqual([
      "Home Row Left Hand",
      "Home Row Right Hand",
      "Home Row",
      "Top Row Left Hand",
      "Top Row Right Hand",
      "Top Row",
    ]);
  });

  it("should include all expected section IDs", () => {
    const sectionIds = data.lessonData.map((section) => section.sectionId);
    expect(sectionIds).toEqual([
      "home-row-left-id",
      "home-row-right-id",
      "home-row-id",
      "top-row-left-id",
      "top-row-right-id",
      "top-row-id",
    ]);
  });

  it("should include all expected section data IDs and level titles", () => {
    const sectionDataIdsAndTitles = data.lessonData.flatMap((section) =>
      section.sectionData.map((data) => ({
        id: data.id,
        levelTitle: data.levelTitle,
      })),
    );
    expect(sectionDataIdsAndTitles).toContainEqual({
      id: "as",
      levelTitle: "as",
    });
    expect(sectionDataIdsAndTitles).toContainEqual({
      id: "jk",
      levelTitle: "jk",
    });
    expect(sectionDataIdsAndTitles).toContainEqual({
      id: "qwertyuiop",
      levelTitle: "qwertyuiop",
    });
  });

  it("should handle absence of optional linkToNovelsWebsite field correctly", () => {
    expect(data).not.toHaveProperty("linkToNovelsWebsite");
  });

  it("should handle empty lessonData array gracefully", () => {
    const emptyLessonData = { ...LessonBeginnerData(), lessonData: [] };
    expect(emptyLessonData.lessonData).toEqual([]);
  });

  it("should handle missing sectionData array within a section", () => {
    const modifiedLessonData = {
      ...LessonBeginnerData(),
      lessonData: [
        { sectionTitle: "Test Section", sectionId: "test-section-id" },
      ],
    };
    expect(modifiedLessonData.lessonData[0]).not.toHaveProperty("sectionData");
  });

  it("should handle missing id in sectionData", () => {
    const modifiedLessonData = {
      ...LessonBeginnerData(),
      lessonData: [
        {
          sectionTitle: "Test Section",
          sectionId: "test-section-id",
          sectionData: [{ levelTitle: "test-level" }],
        },
      ],
    };
    expect(modifiedLessonData.lessonData[0].sectionData[0]).not.toHaveProperty(
      "id",
    );
  });

  it("should validate that sectionData arrays are not empty", () => {
    data.lessonData.forEach((section) => {
      expect(section.sectionData.length).toBeGreaterThan(0);
    });
  });

  it("should ensure all section IDs are unique", () => {
    const sectionIds = data.lessonData.map((section) => section.sectionId);
    const uniqueSectionIds = new Set(sectionIds);
    expect(uniqueSectionIds.size).toBe(sectionIds.length);
  });

  it("should ensure all sectionData IDs are unique within their section", () => {
    data.lessonData.forEach((section) => {
      const ids = section.sectionData.map((data) => data.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  it("should verify that all sections are properly ordered", () => {
    const expectedOrder = [
      "Home Row Left Hand",
      "Home Row Right Hand",
      "Home Row",
      "Top Row Left Hand",
      "Top Row Right Hand",
      "Top Row",
    ];
    const actualOrder = data.lessonData.map((section) => section.sectionTitle);
    expect(actualOrder).toEqual(expectedOrder);
  });
});
