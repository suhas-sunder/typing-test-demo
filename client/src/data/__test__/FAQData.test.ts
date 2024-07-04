import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import FAQData from "../FAQData";

const data = FAQData();

describe("should render defaults", () => {
  it("should return a non-empty array when data is present", () => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should have unique ids for each section", () => {
    const sectionIds = data.map((section) => section.id);
    const uniqueIds = new Set(sectionIds);
    expect(uniqueIds.size).toBe(sectionIds.length);
  });

  it("should have a sectionTitle for each section", () => {
    data.forEach((section) => {
      expect(section.sectionTitle).toBeDefined();
    });
  });

  it("should have non-empty questionLinks arrays for sections with questions", () => {
    data.forEach((section) => {
      if (section.questionLinks.length > 0) {
        expect(Array.isArray(section.questionLinks)).toBe(true);
        expect(section.questionLinks.length).toBeGreaterThan(0);
      }
    });
  });

  it("should have unique ids for questions within each section", () => {
    const allIds: string[] = data.reduce<string[]>((acc, curr) => {
      curr.questionLinks.forEach((question) => acc.push(question.id));
      return acc;
    }, []);

    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it("should have empty questionLinks array for sections without questions", () => {
    const sectionsWithoutQuestions = data.filter(
      (section) => section.questionLinks.length === 0,
    );
    expect(sectionsWithoutQuestions.length).toBeGreaterThan(0);
    sectionsWithoutQuestions.forEach((section) => {
      expect(section.questionLinks).toEqual([]);
    });
  });

  it("should return consistent structure for each section", () => {
    data.forEach((section) => {
      expect(section).toHaveProperty("id");
      expect(section).toHaveProperty("sectionTitle");
      expect(section).toHaveProperty("questionLinks");
      expect(Array.isArray(section.questionLinks)).toBe(true);
    });
  });

  it("should maintain the order of sections", () => {
    const expectedOrder = [
      "Common Questions",
      "Settings",
      "Statistics",
      "Achievements & Unlockables",
      "Speed Test",
      "Lessons",
      "Games",
      "Certificates",
      "Tips and Tricks",
      "About FreeTypingCamp",
      "Technical Stuff",
    ];
    const actualOrder = data.map((section) => section.sectionTitle);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it("should not have duplicate question ids within the same section", () => {
    const data = FAQData();
    const allQuestionIds: string[] = data.reduce<string[]>((acc, curr) => {
      return acc.concat(curr.questionLinks.map((link) => link.id));
    }, []);
    const uniqueQuestionIds = new Set(allQuestionIds);
    expect(allQuestionIds.length).toBe(uniqueQuestionIds.size);
  });
});
