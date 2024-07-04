import { describe, it, expect } from "vitest";
import GetLifetimeStats from "../GetLifetimeStats";
import mockAccountAPI from "../../../mocks/api/mockAccountAPI";

const customMockResponse = { lifetimeStats: "Mocked lifetime stats" };

const { spyGet } = mockAccountAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetLifetimeStats(props);

    expect(spyGet).toHaveBeenCalledWith("/lifetime-stats", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return lifetime stats correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetLifetimeStats(props);

    expect(result).toEqual(customMockResponse);
  });
});
