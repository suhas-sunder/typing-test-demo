/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import PostSendPwdResetEmail from "../PostSendPwdResetEmail";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { success: true };

const { spyPost } = mockUserAPI({ customMockResponse });

describe("PostSendPwdResetEmail function", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      email: "test@example.com",
      setError: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendPwdResetEmail(props);

    expect(spyPost).toHaveBeenCalledWith("/send-pwd-reset-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: props.email,
      },
    });
  });

  it("should increment the sent email count on success", async () => {
    const props = {
      email: "test@example.com",
      setError: vi.fn(),
      setSentEmailCount: vi.fn(),
    };

    await PostSendPwdResetEmail(props);

    expect(props.setSentEmailCount).toHaveBeenCalledWith(expect.any(Function));
  });
});
