import { describe, it, expect } from "vitest";
import CalculateStartEndDates from "../CalculateStartEndDates";

describe("should render defaults", () => {
  it("should return correct start and end dates for a given number of weeks before today", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 2,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 2 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() - 3 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should handle single week before today correctly", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 1,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 1 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() - 2 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should handle multiple weeks before today correctly", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 5,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 5 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() - 6 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should calculate start date as today minus given weeks", () => {
    const { generatedStartDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 3,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 3 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
  });

  it("should calculate end date as one week before the start date", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 4,
    });
    const expectedEndDate = new Date(
      generatedStartDate.valueOf() - 7 * 86400000,
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should handle zero weeks before today correctly", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 0,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf());
    const expectedEndDate = new Date(today.valueOf() - 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should handle negative number of weeks gracefully", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: -2,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() + 2 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() + 1 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should handle large number of weeks without performance issues", () => {
    const startTime = performance.now();
    CalculateStartEndDates({ numWeeksBeforeToday: 1000 });
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Ensure it runs within a reasonable time frame
  });

  it("should ensure returned dates are valid Date objects", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 3,
    });
    expect(generatedStartDate instanceof Date).toBe(true);
    expect(generatedEndDate instanceof Date).toBe(true);
  });

  it("should handle leap years correctly", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 2,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 2 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() - 3 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });

  it("should not mutate input parameters when generating start and end dates", () => {
    const inputParams = { numWeeksBeforeToday: 2 };
    const inputParamsCopy = { ...inputParams };
    CalculateStartEndDates(inputParams);
    expect(inputParams).toEqual(inputParamsCopy);
  });

  it("should handle daylight saving time changes correctly", () => {
    const { generatedStartDate, generatedEndDate } = CalculateStartEndDates({
      numWeeksBeforeToday: 2,
    });
    const today = new Date();
    const expectedStartDate = new Date(today.valueOf() - 2 * 7 * 86400000);
    const expectedEndDate = new Date(today.valueOf() - 3 * 7 * 86400000);
    expect(generatedStartDate.toDateString()).toBe(
      expectedStartDate.toDateString(),
    );
    expect(generatedEndDate.toDateString()).toBe(
      expectedEndDate.toDateString(),
    );
  });
});
