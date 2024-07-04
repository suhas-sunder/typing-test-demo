/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { vi } from "vitest";

interface PropType {
  customMockResponse?: any;
}

function mockAxios({ customMockResponse }: PropType) {
  const mockResponse = "default response";

  const spyGet = vi
    .spyOn(axios, "get")
    .mockResolvedValue({
      data: customMockResponse ? customMockResponse : mockResponse,
    });

  const spyPost = vi
    .spyOn(axios, "post")
    .mockResolvedValue({
      data: customMockResponse ? customMockResponse : mockResponse,
    });

  const spyDelete = vi
    .spyOn(axios, "delete")
    .mockResolvedValue({
      data: customMockResponse ? customMockResponse : mockResponse,
    });

  return { spyDelete, spyGet, spyPost };
}

export default mockAxios;
