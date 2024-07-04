import { it, expect } from "vitest";
import CalculatorGameFAQData from "../CalculatorGameFAQData";

const faqData = CalculatorGameFAQData();

describe("should render defaults", () => {
  it("should return an array of FAQ objects with id prop when invoked", () => {
    expect(Array.isArray(faqData)).toBe(true);
    expect(faqData.length).toBeGreaterThan(0);
    faqData.forEach((faq) => {
      expect(faq).toHaveProperty("id");
    });
  });

  it("should return an array of FAQ objects with title prop when invoked", () => {
    expect(Array.isArray(faqData)).toBe(true);
    expect(faqData.length).toBeGreaterThan(0);
    faqData.forEach((faq) => {
      expect(faq).toHaveProperty("title");
    });
  });

  it("should return an array of FAQ objects with details prop when invoked", () => {
    expect(Array.isArray(faqData)).toBe(true);
    expect(faqData.length).toBeGreaterThan(0);
    faqData.forEach((faq) => {
      expect(faq).toHaveProperty("details");
    });
  });

  it("should return an array of FAQ objects with string or JSX details", () => {
    faqData.forEach((faq) => {
      expect(
        typeof faq.details === "string" || faq.details instanceof Object,
      ).toBe(true);
    });
  });
});
