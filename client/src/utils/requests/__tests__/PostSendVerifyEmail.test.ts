import { describe, it, expect, vi } from "vitest";
import PostSendVerifyEmail from "../PostSendVerifyEmail";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { success: true };

const { spyPost } = mockUserAPI({ customMockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      email: "test@example.com",
      username: "testuser",
      setDisplayError: vi.fn(),
      setVerificationSent: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendVerifyEmail(props);

    expect(spyPost).toHaveBeenCalledWith("/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: props.username,
        email: props.email,
      },
    });
  });

  it("should set verification sent message and increment email count on success", async () => {
    const props = {
      email: "test@example.com",
      username: "testuser",
      setDisplayError: vi.fn(),
      setVerificationSent: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendVerifyEmail(props);

    expect(props.setVerificationSent).toHaveBeenCalledWith(
      expect.stringContaining("Verification email has just been sent!"),
    );
    expect(props.setSentEmailCount).toHaveBeenCalledWith(expect.any(Function));
  });
});
