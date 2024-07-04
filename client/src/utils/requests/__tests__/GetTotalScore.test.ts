import { describe, it, expect } from "vitest";
import GetTotalScore from "../GetTotalScore";
import mockAccountAPI from "../../../mocks/api/mockAccountAPI";

const customMockResponse = { totalscore: 100 };

const { spyGet } = mockAccountAPI({ customMockResponse });

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      userId: "123",
    };

    await GetTotalScore(props);

    expect(spyGet).toHaveBeenCalledWith("/totalscore", {
      method: "GET",
      params: {
        userId: props.userId,
      },
    });
  });

  it("should return total score correctly", async () => {
    const props = {
      userId: "123",
    };

    const result = await GetTotalScore(props);

    expect(result).toEqual(customMockResponse.totalscore);
  });
});
