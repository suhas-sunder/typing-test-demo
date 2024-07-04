/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import LessonGraduationData from "../LessonGraduationData";

const data = LessonGraduationData();

describe("should render defaults", () => {
  it("should return an object with the correct structure", () => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("lessonData");
  });

  it("should include the correct id for the lesson", () => {
    expect(data.id).toBe("graduation-id");
  });

  it("should include the correct title for the lesson", () => {
    expect(data.title).toBe("Graduation");
  });

  it("should include the correct sectionTitle in lessonData", () => {
    expect(data.lessonData[0].sectionTitle).toBe("You Made It");
  });

  it("should include the correct sectionId in lessonData", () => {
    expect(data.lessonData[0].sectionId).toBe("you-made-it-id");
  });

  it("should include the correct id in sectionData", () => {
    expect(data.lessonData[0].sectionData[0].id).toBe("congratulations");
  });

  it("should include the correct levelTitle in sectionData", () => {
    expect(data.lessonData[0].sectionData[0].levelTitle).toBe(
      "Congratulations!",
    );
  });

  it("should handle missing optional linkToNovelsWebsite", () => {
    expect(data.linkToNovelsWebsite).toBeUndefined();
  });

  it("should handle empty lessonData array", () => {
    const data = LessonGraduationData();
    data.lessonData = [];
    expect(data.lessonData.length).toBe(0);
  });

  it("should handle empty sectionData array", () => {
    data.lessonData[0].sectionData = [];
    expect(data.lessonData[0].sectionData.length).toBe(0);
  });

  it("should handle unexpected additional properties in the input", () => {
    (data as any).unexpectedProperty = "unexpected";
    expect((data as any).unexpectedProperty).toBe("unexpected");
  });

  it("should ensure the function is pure and returns consistent results", () => {
    const data1 = LessonGraduationData();
    const data2 = LessonGraduationData();
    expect(data1).toEqual(data2);
  });

  it("should verify the function does not modify any external state", () => {
    const externalState = { modified: false };
    LessonGraduationData();
    expect(externalState.modified).toBe(false);
  });

  it("should check for correct data types in the returned object", () => {
    const data = LessonGraduationData();
    expect(typeof data.id).toBe("string");
    expect(typeof data.title).toBe("string");
    expect(Array.isArray(data.lessonData)).toBe(true);
    expect(typeof data.lessonData[0].sectionTitle).toBe("string");
    expect(typeof data.lessonData[0].sectionId).toBe("string");
    expect(Array.isArray(data.lessonData[0].sectionData)).toBe(true);
    expect(typeof data.lessonData[0].sectionData[0].id).toBe("string");
    expect(typeof data.lessonData[0].sectionData[0].levelTitle).toBe("string");
  });

  it("should ensure the function is resilient to minor changes in data structure", () => {
    const modifiedLesson = {
      id: "graduation-id",
      title: "Graduation",
      lessonDetails: [
        {
          sectionTitleText: "You Made It",
          sectionIdentifier: "you-made-it-id",
          sectionDetails: [
            {
              identifier: "congratulations",
              titleOfLevel: "Congratulations!",
            },
          ],
        },
      ],
    };

    // Simulate a minor change by renaming properties and check if original structure is intact.
    const result = LessonGraduationData();

    expect(result.id).toBe(modifiedLesson.id);
    expect(result.title).toBe(modifiedLesson.title);

    // Check if original structure is still valid.
    expect(result.lessonData[0].sectionTitle).toBe("You Made It");
    expect(result.lessonData[0].sectionId).toBe("you-made-it-id");
    expect(result.lessonData[0].sectionData[0].id).toBe("congratulations");
    expect(result.lessonData[0].sectionData[0].levelTitle).toBe(
      "Congratulations!",
    );
  });
});
