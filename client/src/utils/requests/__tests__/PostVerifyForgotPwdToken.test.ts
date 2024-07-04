import { describe, it, expect, vi } from "vitest";
import PostVerifyForgotPwdToken from "../PostVerifyForgotPwdToken";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { user_email: "test@example.com" };

const { spyPost } = mockUserAPI({ customMockResponse });

describe("handles post request correctly", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      resetToken: "mockResetToken",
      setError: vi.fn(),
      setResetPassword: vi.fn(),
      setResetPasswordEmail: vi.fn(),
    };

    await PostVerifyForgotPwdToken(props);

    expect(spyPost).toHaveBeenCalledWith("/verify-pwd-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        resetToken: props.resetToken,
      },
    });
  });

  it("should set verification status correctly", async () => {
    const props = {
      resetToken: "mockResetToken",
      setError: vi.fn(),
      setResetPassword: vi.fn(),
      setResetPasswordEmail: vi.fn(),
    };

    const result = await PostVerifyForgotPwdToken(props);

    expect(result).toEqual(customMockResponse);
  });
});
