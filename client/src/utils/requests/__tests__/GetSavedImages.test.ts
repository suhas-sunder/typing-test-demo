import { describe, it, expect } from "vitest";
import GetSavedImages from "../GetSavedImages";
import mockImageAPI from "../../../mocks/api/mockImageAPI";

const customMockResponse = { savedImages: "Mocked saved images" };

const { spyGet } = mockImageAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetSavedImages(props);

    expect(spyGet).toHaveBeenCalledWith("/defaults", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return saved images correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetSavedImages(props);

    expect(result).toEqual(customMockResponse);
  });
});
