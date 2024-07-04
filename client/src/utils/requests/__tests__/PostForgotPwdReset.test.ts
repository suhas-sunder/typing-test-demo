import { describe, it, expect, vi } from "vitest";
import PostForgotPwdReset from "../PostForgotPwdReset";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { verified: true };

const { spyPost } = mockUserAPI({ customMockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      setIsReset: vi.fn(),
      setError: vi.fn(),
      email: "test@example.com",
      password: "password123",
      setIsAuthenticated: vi.fn(),
    };

    await PostForgotPwdReset(props);

    expect(spyPost).toHaveBeenCalledWith("/reset-pwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: props.email,
        password: props.password,
      },
    });
  });

  it("should set reset status correctly", async () => {
    const props = {
      setIsReset: vi.fn(),
      setError: vi.fn(),
      email: "test@example.com",
      password: "password123",
      setIsAuthenticated: vi.fn(),
    };

    const result = await PostForgotPwdReset(props);

    expect(result).toEqual(customMockResponse);
  });
});
