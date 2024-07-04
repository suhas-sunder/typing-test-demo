import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import CallToActionData from "../CallToActionData";

const data = CallToActionData();

describe("should render defaults", () => {
  it("should return an array of objects with id prop", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
    });
  });

  it("should return an array of objects with icon prop", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("icon");
    });
  });

  it("should return an array of objects with icon title prop", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("iconTitle");
    });
  });

  it("should return an array of objects with section title prop", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => {
      expect(item).toHaveProperty("sectionTitle");
    });
  });
});
