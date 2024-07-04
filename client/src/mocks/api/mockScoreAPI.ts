/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import scoreAPI from "../../api/scoreAPI";

interface PropType {
  customMockResponse?: { [key: string]: any };
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockScoreAPI({ customMockResponse }: PropType) {
  const mockResponse = { result: true };

 const spyGet = vi.spyOn(scoreAPI, "get").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

 const spyPost = vi.spyOn(scoreAPI, "post").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

 const spyDelete = vi.spyOn(scoreAPI, "delete").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  return {spyGet, spyPost, spyDelete}
}
