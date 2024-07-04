/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import accountAPI from "../../api/accountAPI";

interface PropType {
  customMockResponse?: { [key: string]: any };
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockAccountAPI({ customMockResponse }: PropType) {
  const mockResponse = { result: true };

  const spyGet = vi.spyOn(accountAPI, "get").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyPost = vi.spyOn(accountAPI, "post").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyDelete = vi.spyOn(accountAPI, "delete").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  return { spyGet, spyPost, spyDelete };
}
