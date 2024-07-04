import { describe, it, expect } from "vitest";
import GetBestStats from "../GetBestStats";
import mockAccountAPI from "../../../mocks/api/mockAccountAPI";

const customMockResponse = { success: true };

const { spyGet } = mockAccountAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to /best-stats with correct data", async () => {
    // Data to pass to GetBestStats function
    const props = {
      userId: "123",
      testName: "test",
      difficultyLevel: "easy",
    };

    await GetBestStats(props);

    expect(spyGet).toHaveBeenCalledWith("/best-stats", {
      method: "GET",
      params: {
        userId: props.userId,
        test_name: props.testName,
        difficulty_name: props.difficultyLevel,
      },
    });
  });

  it("should make a GET request to /best-stats with correct data and return success", async () => {
    const props = {
      userId: "123",
      testName: "test",
      difficultyLevel: "easy",
    };

    const result = await GetBestStats(props);

    expect(result).toEqual({ success: true });
  });
});
