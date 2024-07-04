/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import imageAPI from "../../api/imageAPI";

interface PropType {
  customMockResponse?: { [key: string]: any };
  stat?: number;
}

//Mock all possible api routes that can be hit when switching routes so the actual api's are not called
export default function mockImageAPI({ customMockResponse, stat }: PropType) {
  const mockResponse = { result: true };

  const spyGet = vi.spyOn(imageAPI, "get").mockResolvedValue({
   status: stat ? stat : 200, data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyPost = vi.spyOn(imageAPI, "post").mockResolvedValue({
   status: stat ? stat : 200, data: customMockResponse ? customMockResponse : mockResponse,
  });

  const spyDelete = vi.spyOn(imageAPI, "delete").mockResolvedValue({
   status: stat ? stat : 200, data: customMockResponse ? customMockResponse : mockResponse,
  });

  return { spyGet, spyPost, spyDelete };
}
