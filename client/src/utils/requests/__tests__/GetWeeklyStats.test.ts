import { describe, it, expect } from "vitest";
import GetWeeklyStats from "../GetWeeklyStats";
import mockAccountAPI from "../../../mocks/api/mockAccountAPI";

const customMockResponse = { weeklyStats: "Mocked weekly stats" };

const { spyGet } = mockAccountAPI({ customMockResponse });

describe("GetWeeklyStats function", () => {
  it("should make a GET request to the specified URL with correct parameters", async () => {
    const props = {
      userId: "123",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
    };

    await GetWeeklyStats(props);

    expect(spyGet).toHaveBeenCalledWith("/weekly-stats", {
      method: "GET",
      params: {
        userId: props.userId,
        startDate: props.startDate,
        endDate: props.endDate,
      },
    });
  });

  it("should return weekly stats correctly", async () => {
    const props = {
      userId: "123",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
    };

    const result = await GetWeeklyStats(props);

    expect(result).toEqual(customMockResponse);
  });
});
