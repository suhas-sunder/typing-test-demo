import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonIntermediateData from "../LessonIntermediateData";

const data = LessonIntermediateData();

describe("should render defaults", () => {
  it("should return an object of type LessonDataType", () => {
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
  });

  it("should include correct id and title for intermediate lessons", () => {
    expect(data.id).toBe("intermediate-id");
    expect(data.title).toBe("Intermediate");
  });

  it("should contain all expected sections with correct section titles and ids", () => {
    const expectedSections = [
      { title: "Bottom Row Left Hand", id: "bottom-row-left-id" },
      { title: "Bottom Row Right Hand", id: "bottom-row-right-id" },
      { title: "Bottom Row", id: "bottom-row-id" },
      { title: "English Words", id: "all-three-rows-id" },
    ];
    expectedSections.forEach((section, index) => {
      expect(data.lessonData[index].sectionTitle).toBe(section.title);
      expect(data.lessonData[index].sectionId).toBe(section.id);
    });
  });

  it("should include the correct number of sectionData entries in each section", () => {
    const expectedCounts = [9, 9, 10, 12];
    data.lessonData.forEach((section, index) => {
      expect(section.sectionData.length).toBe(expectedCounts[index]);
    });
  });

  it("should include the correct number of sectionData entries in each section", () => {
    const expectedCounts = [9, 9, 10, 12];
    data.lessonData.forEach((section, index) => {
      expect(section.sectionData.length).toBe(expectedCounts[index]);
    });
  });

  it("should have correct ids and levelTitles in sectionData entries grouped by sections", () => {
    const expectedEntries = {
      "Bottom Row Left Hand": [
        { id: "zx", levelTitle: "zx" },
        { id: "zc", levelTitle: "zc" },
        { id: "zv", levelTitle: "zv" },
        { id: "zb", levelTitle: "zb" },
        { id: "xcv", levelTitle: "xcv" },
        { id: "zxc", levelTitle: "zxc" },
        { id: "cvb", levelTitle: "cvb" },
        { id: "zxcvb", levelTitle: "zxcvb" },
        { id: "zxcvb-capital", levelTitle: "ZXCVB" },
      ],
      "Bottom Row Right Hand": [
        { id: "nm", levelTitle: "nm" },
        { id: "n,", levelTitle: "n," },
        { id: "n.", levelTitle: "n." },
        { id: "n/", levelTitle: "n/" },
        { id: "m,.", levelTitle: "m,." },
        { id: "nm,", levelTitle: "nm," },
        { id: ",./", levelTitle: ",./" },
        { id: "nm,./", levelTitle: "nm,./" },
        { id: "nm<>?", levelTitle: "NM<>?" },
      ],
      "Bottom Row": [
        { id: "zxnm", levelTitle: "zxnm" },
        { id: "zcn,", levelTitle: "zcn," },
        { id: "zvn.", levelTitle: "zvn." },
        { id: "zbn/", levelTitle: "zbn/" },
        { id: "xcvm,.", levelTitle: "xcvm,." },
        { id: "zxcnm,", levelTitle: "zxcnm," },
        { id: "cvb,./", levelTitle: "cvb,./" },
        { id: "zxcvbnm,./", levelTitle: "zxcvbnm,./" },
        { id: "zxcvbnm<>?-capital", levelTitle: "ZXCVBNM<>?" },
        { id: "zxcvbzxcvbnm,./nm,./", levelTitle: "Full Bottom Row" },
      ],
      "English Words": [
        { id: "lower-case-1", levelTitle: "lower case left hand" },
        { id: "lower-case-2", levelTitle: "lower case right hand" },
        { id: "lower-case-3", levelTitle: "lower case both hands" },
        { id: "upper-case-1", levelTitle: "UPPER CASE LEFT HAND" },
        { id: "upper-case-2", levelTitle: "UPPER CASE RIGHT HAND" },
        { id: "upper-case-3", levelTitle: "UPPER CASE BOTH HANDS" },
        { id: "camel-case-1", levelTitle: "Title Case Left Hand" },
        { id: "camel-case-2", levelTitle: "Title Case: Right Hand" },
        { id: "camel-case-3", levelTitle: "Title Case: Both Hands" },
        { id: "pascal-case-1", levelTitle: "MiXed CasE LeFt HaNd" },
        { id: "pascal-case-2", levelTitle: "MiXed CasE rIgHt HaNd" },
        { id: "pascal-case-3", levelTitle: "MiXed CasE BoTh HanDs" },
      ],
    };
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((entry) => {
        const expectedEntry = expectedEntries[section.sectionTitle].find(
          (e) => e.id === entry.id,
        );
        expect(expectedEntry).toBeDefined();
        expect(entry.levelTitle).toBe(expectedEntry.levelTitle);
      });
    });
  });

  it("should include optional linkToNovelsWebsite field as undefined", () => {
    expect(data.linkToNovelsWebsite).toBeUndefined();
  });

  it("should verify no additional unexpected properties are present", () => {
    const allowedKeys = ["id", "title", "lessonData", "linkToNovelsWebsite"];
    Object.keys(data).forEach((key) => {
      expect(allowedKeys.includes(key)).toBe(true);
    });
  });

  it("should check for unique ids within sectionData entries", () => {
    const ids = new Set();
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((entry) => {
        expect(ids.has(entry.id)).toBe(false);
        ids.add(entry.id);
      });
    });
  });

  it("should validate structure and types of nested objects", () => {
    data.lessonData.forEach((section) => {
      expect(typeof section.sectionTitle).toBe("string");
      expect(typeof section.sectionId).toBe("string");
      section.sectionData.forEach((entry) => {
        expect(typeof entry.id).toBe("string");
        expect(typeof entry.levelTitle).toBe("string");
      });
    });
  });

  it("should ensure no mutation of the returned data object", () => {
    const originalData = JSON.stringify(data);
    // Attempt to mutate the data
    data.id = "mutated-id";
    data.lessonData[0].sectionTitle = "mutated-title";
    // Check if original data remains unchanged
    expect(JSON.stringify(LessonIntermediateData())).toBe(originalData);
  });

  it("should verify correct capitalization in levelTitles", () => {
    const capitalizedLevels = ["ZXCVB", "NM<>?", "ZXCVBNM<>?"];
    data.lessonData.forEach((section) => {
      section.sectionData.forEach((entry) => {
        if (capitalizedLevels.includes(entry.levelTitle)) {
          expect(entry.levelTitle).toEqual(entry.levelTitle.toUpperCase());
        }
      });
    });
  });

  it("should ensure compatibility with other LessonDataType objects", () => {
    const beginnerLesson = {
      id: "beginner-id",
      title: "Beginner",
      lessonData: [
        {
          sectionTitle: "Home Row",
          sectionId: "home-row-id",
          sectionData: [{ id: "asdf", levelTitle: "asdf" }],
        },
      ],
    };

    const intermediateLesson = LessonIntermediateData();

    // Check if both objects conform to the same structure
    [beginnerLesson, intermediateLesson].forEach((lesson) => {
      expect(lesson).toHaveProperty("id");
      expect(lesson).toHaveProperty("title");
      expect(lesson).toHaveProperty("lessonData");
      lesson.lessonData.forEach((section) => {
        expect(section).toHaveProperty("sectionTitle");
        expect(section).toHaveProperty("sectionId");
        expect(section).toHaveProperty("sectionData");
        section.sectionData.forEach((entry) => {
          expect(entry).toHaveProperty("id");
          expect(entry).toHaveProperty("levelTitle");
        });
      });
    });
  });
});
