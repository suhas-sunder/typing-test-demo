import { describe, it, expect, vi } from "vitest";
import GetLessonText from "../GetLessonText";
import mockAxios from "../../../mocks/api/mockAxios";

const customMockResponse = "Mocked lesson text";


const {spyGet} = mockAxios({customMockResponse})

describe("handles get request correctly", () => {
  it("should make a GET request to the specified URL", async () => {
    const props = {
      url: "https://example.com/lesson",
      setLessonText: vi.fn(),
    };

    await GetLessonText(props);

    expect(spyGet).toHaveBeenCalledWith(props.url);
  });

  it("should set lesson text correctly", async () => {
    const props = {
      url: "https://example.com/lesson",
      setLessonText: vi.fn(),
    };

    await GetLessonText(props);

    expect(props.setLessonText).toHaveBeenCalledWith(customMockResponse);
  });
});
