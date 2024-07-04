/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import PostImages from "../PostImages";
import mockImageAPI from "../../../mocks/api/mockImageAPI";

const customMockResponse = { result: "Post request successful!" };

const { spyPost } = mockImageAPI({ customMockResponse, stat: 200 });

describe("PostImages function", () => {
  it("should make a POST request to the specified URL with correct data and headers", async () => {
    const props = {
      imgSaveData: {
        profilePathname: "path/to/profile.jpg",
        userId: "123",
      },
    };

    await PostImages(props);

    expect(spyPost).toHaveBeenCalledWith("/default-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        profilePathname: props.imgSaveData.profilePathname,
        userId: props.imgSaveData.userId,
      },
    });
  });

  it("should handle and log gameOverPathname correctly", async () => {
    const props = {
      imgSaveData: {
        gameOverPathname: "path/to/gameover.jpg",
      },
    };

    const consoleSpy = vi.spyOn(console, "log");

    await PostImages(props);

    expect(consoleSpy).toHaveBeenCalledWith(props.imgSaveData.gameOverPathname);
  });

  it("should return the response when the profilePathname is provided", async () => {
    const props = {
      imgSaveData: {
        profilePathname: "/profile.jpg",
        userId: "123",
      },
    };

    const result = await PostImages(props);

    expect(result?.data).toEqual(customMockResponse);
  });

  it("should return an empty string when no profilePathname is provided", async () => {
    const props = {
      imgSaveData: {
        userId: "123",
      },
    };

    const result = await PostImages(props);

    expect(result).toEqual(null);
  });
});
