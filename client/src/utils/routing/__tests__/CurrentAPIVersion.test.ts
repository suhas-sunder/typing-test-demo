import { describe, it, expect } from "vitest";
import CurrentAPIVersion from "../CurrentAPIVersion";

describe("handles version correctly", () => {
  it('should return correct API version as "v1"', () => {
    const version = CurrentAPIVersion();
    expect(version).toBe("v1");
  });

  it("should execute without errors", () => {
    expect(() => CurrentAPIVersion()).not.toThrow();
  });

  it("should return a string type", () => {
    const version = CurrentAPIVersion();
    expect(typeof version).toBe("string");
  });

  it("should be called multiple times in quick succession", () => {
    for (let i = 0; i < 100; i++) {
      const version = CurrentAPIVersion();
      expect(version).toBe("v1");
    }
  });
});
