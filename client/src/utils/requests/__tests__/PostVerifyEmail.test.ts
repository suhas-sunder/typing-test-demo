import { describe, it, expect, vi } from "vitest";
import PostVerifyEmail from "../PostVerifyEmail";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { verified: true };

const { spyPost } = mockUserAPI({ customMockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      emailToken: "mockEmailToken",
      setDisplayError: vi.fn(),
      setIsVerified: vi.fn(),
      setAccountDetails: vi.fn(),
    };

    await PostVerifyEmail(props);

    expect(spyPost).toHaveBeenCalledWith("/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        emailToken: props.emailToken,
      },
    });
  });

  it("should set verification status correctly", async () => {
    const props = {
      emailToken: "mockEmailToken",
      setDisplayError: vi.fn(),
      setIsVerified: vi.fn(),
      setAccountDetails: vi.fn(),
    };

    const result = await PostVerifyEmail(props);

    expect(result).toEqual(customMockResponse);
  });
});
