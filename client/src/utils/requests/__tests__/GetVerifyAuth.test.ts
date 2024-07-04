import { describe, it, expect } from "vitest";
import GetVerifyAuth from "../GetVerifyAuth";
import mockUserAPI from "../../../mocks/api/mockUserAPI";

const customMockResponse = { verified: true };

const { spyGet } = mockUserAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL with correct headers", async () => {
    await GetVerifyAuth();

    expect(spyGet).toHaveBeenCalledWith("/is-verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    });
  });

  it("should return verification status correctly", async () => {
    const result = await GetVerifyAuth();

    expect(result).toEqual(customMockResponse);
  });
});
