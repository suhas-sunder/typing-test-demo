import { describe, it, expect, beforeEach } from "vitest";
import { AxiosInstance } from "axios";

const originalEnv = process.env;

describe("Axios Instance Configuration", () => {
  let instance: AxiosInstance;

  beforeEach(async () => {
    // Reset environment before each test
    process.env = { ...originalEnv };
    // Dynamically import the axios instance after setting environment variable
    instance = (await import("../cloudflareR2API")).default;
  });

  afterEach(() => {
    // Restore original environment after each test
    process.env = originalEnv;
  });

  it("should have the correct base URL and timeout in development mode", () => {
    process.env.NODE_ENV = "development";
    const expectedBaseURL = "https://www.honeycombartist.com";
    const { baseURL, timeout } = instance.defaults;

    expect(baseURL).toBe(expectedBaseURL);
    expect(timeout).toBe(30000);
  });

  it("should have the correct base URL and timeout in production mode", () => {
    process.env.NODE_ENV = "production";
    const expectedBaseURL = "https://www.honeycombartist.com";
    const { baseURL, timeout } = instance.defaults;

    expect(baseURL).toBe(expectedBaseURL);
    expect(timeout).toBe(30000);
  });
});
