import { it, expect, describe, vi } from "vitest";

import mockAxiosInstance from "../imageAPI";
import CurrentAPIVersion from "../../utils/routing/CurrentAPIVersion";

// Mock CurrentAPIVersion
vi.mock("../utils/routing/CurrentAPIVersion", () => ({
  default: vi.fn(() => "v1"),
}));

const version = CurrentAPIVersion();

describe("Axios Instance Configuration", async () => {
  if (process.env.NODE_ENV === "production") {
    it("should have the correct base URL and timeout in production mode", () => {
      const expectedBaseURL = `/${version}/api/images/`;
      const instance = mockAxiosInstance;

      expect(instance.defaults.baseURL).toBe(expectedBaseURL);
      expect(instance.defaults.timeout).toBe(30000);
    });
  } else {
    it("should have the correct base URL and timeout in development mode", () => {
      const expectedBaseURL = `http://localhost:3500/${version}/api/images/`;
      const instance = mockAxiosInstance;
      expect(instance.defaults.baseURL).toBe(expectedBaseURL);
      expect(instance.defaults.timeout).toBe(30000);
    });
  }

  it("should use the correct API version from CurrentAPIVersion", () => {
    const version = "v1"; // as mocked above
    expect(CurrentAPIVersion()).toBe(version);
  });
});
