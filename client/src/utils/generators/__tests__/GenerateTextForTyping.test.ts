import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import GenerateTextForTyping from "../GenerateTextForTyping";
import mockCloudflareR2API from "../../../mocks/api/mockCloudflareR2API";

const { spyGet } = mockCloudflareR2API({});

describe("generates correct text for typing", () => {
  it("should generate random number within bounds of allArticles length", () => {
    const setText = vi.fn();
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.5);
    GenerateTextForTyping({ setText });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should fetch article text successfully from cloudflareR2API", async () => {
    const setText = vi.fn();
    const mockResponse = { data: "Sample text" };
    spyGet.mockResolvedValue(mockResponse);
    await GenerateTextForTyping({ setText });
    expect(spyGet).toHaveBeenCalled();
  });
});
