/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import cloudflareR2API from "../../api/cloudflareR2API";

interface PropType {
  customMockResponse?: { [key: string]: any };
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockCloudflareR2API({ customMockResponse }: PropType) {
  const mockResponse = { result: true };

  const spyGet = vi.spyOn(cloudflareR2API, "get").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyPost = vi.spyOn(cloudflareR2API, "post").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyDelete = vi.spyOn(cloudflareR2API, "delete").mockResolvedValue({
    data: customMockResponse ? customMockResponse : mockResponse,
  });

  return { spyGet, spyPost, spyDelete };
}
