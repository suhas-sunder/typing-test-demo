/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import userAPI from "../../api/userAPI";

interface PropType {
  customMockResponse?: { [key: string]: any };
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockUserAPI({ customMockResponse }: PropType) {
  const mockResponse = { result: true };

  const spyGet = vi.spyOn(userAPI, "get").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyPost = vi.spyOn(userAPI, "post").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyDelete = vi.spyOn(userAPI, "delete").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  return { spyPost, spyGet, spyDelete };
}
