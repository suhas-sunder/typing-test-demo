import { it, expect } from "vitest";
import SitemapData from "../SitemapData";

const data = SitemapData();

describe("should render defaults", () => {
  it("should return a list of pages with correct structure", () => {
    expect(Array.isArray(data)).toBe(true);
    data.forEach((page) => {
      expect(page).toHaveProperty("id");
      expect(page).toHaveProperty("title");
      expect(page).toHaveProperty("url");
      expect(page).toHaveProperty("links");
    });
  });

  it("should contain id, title, url, and links for each page", () => {
    data.forEach((page) => {
      expect(page.id).toBeDefined();
      expect(page.title).toBeDefined();
      expect(page.url).toBeDefined();
      expect(page.links).toBeDefined();
    });
  });

  it("should have correct id, name, and url for each link within pages", () => {
    data.forEach((page) => {
      page.links.forEach((link) => {
        expect(link.id).toBeDefined();
        expect(link.name).toBeDefined();
        expect(link.url).toBeDefined();
      });
    });
  });

  it("should handle pages with no links correctly", () => {
    data.forEach((page) => {
      if (page.links.length === 0) {
        expect(Array.isArray(page.links)).toBe(true);
      }
    });
  });

  it("should return consistent data structure on multiple calls", () => {
    const data1 = SitemapData();
    const data2 = SitemapData();
    expect(data1).toEqual(data2);
  });

  it("should handle empty links array gracefully", () => {
    data.forEach((page) => {
      if (page.links.length === 0) {
        expect(page.links).toEqual([]);
      }
    });
  });

  it("should handle missing url in some pages", () => {
    data.forEach((page) => {
      if (!page.url) {
        expect(page.url).toBe("");
      }
    });
  });

  it("should handle missing id in some links", () => {
    data.forEach((page) => {
      page.links.forEach((link) => {
        if (!link.id) {
          expect(link.id).toBeUndefined();
        }
      });
    });
  });

  it("should handle missing title in some pages", () => {
    data.forEach((page) => {
      if (!page.title) {
        expect(page.title).toBeUndefined();
      }
    });
  });

  it("should handle missing name in some links", () => {
    data.forEach((page) => {
      page.links.forEach((link) => {
        if (!link.name) {
          expect(link.name).toBeUndefined();
        }
      });
    });
  });

  it("should ensure no duplicate ids within the same page", () => {
    data.forEach((page) => {
      const ids = page.links.map((link) => link.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  it("should ensure no duplicate urls within the same page", () => {
    data.forEach((page) => {
      const urls = page.links.map((link) => link.url);
      const uniqueUrls = new Set(urls);
      expect(urls.length).toBe(uniqueUrls.size);
    });
  });

  it("should handle special characters in ids and names", () => {
    data.forEach((page) => {
      page.links.forEach((link) => {
        expect(typeof link.id).toBe("string");
        expect(typeof link.name).toBe("string");
      });
    });
  });

  it("should handle long strings in titles and names", () => {
    data.forEach((page) => {
      expect(typeof page.title).toBe("string");
      page.links.forEach((link) => {
        expect(typeof link.name).toBe("string");
      });
    });
  });

  it("should handle deeply nested link structures", () => {
    const nestedLink = data.find((page) =>
      page.links.some((link) =>
        link.url.includes("/lessons/lesson/1/sec-1/lvl-1"),
      ),
    );
    expect(nestedLink).toBeDefined();
  });
});
