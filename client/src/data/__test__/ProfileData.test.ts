/* eslint-disable no-prototype-builtins */
import { it, expect } from "vitest";
import ProfileData from "../ProfileData";

const data = ProfileData();

describe("should render defaults", () => {
  it("should return an array of menu items", () => {
    expect(Array.isArray(data)).toBe(true);
  });

  it("should ensure each menu item has id, title, icon, and url", () => {
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("url");
    });
  });

  it("should include menu items with customLabelStyle property", () => {
    const customLabelItems = data.filter((item) => item.customLabelStyle);
    expect(customLabelItems.length).toBeGreaterThan(0);
  });

  it("should include menu items with checked property", () => {
    const checkedItems = data.filter((item) => item.hasOwnProperty("checked"));
    expect(checkedItems.length).toBeGreaterThan(0);
  });

  it("should return menu items in the correct order", () => {
    const expectedOrder = [
      "menu-profile",
      "menu-profile-img",
      "menu-stats",
      "menu-achievements",
      "menu-themes",
      "menu-account",
    ];
    const dataOrder = data.map((item) => item.id);
    expect(dataOrder).toEqual(expectedOrder);
  });

  it("should return non-empty profileMenuData array", () => {
    expect(data.length).toBeGreaterThan(0);
  });

  it("should not contain duplicate ids", () => {
    const ids = data.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should not contain invalid URLs", () => {
    data.forEach((item) => {
      expect(item.url).toMatch(/^\/profile\//);
    });
  });

  it("should not contain items with missing properties", () => {
    data.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("url");
    });
  });

  it("should not contain unexpected properties", () => {
    const allowedProperties = [
      "id",
      "title",
      "icon",
      "url",
      "customLabelStyle",
      "checked",
    ];

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        expect(allowedProperties.includes(key)).toBe(true);
      });
    });
  });

  it("should ensure all URLs start with /profile/", () => {
    data.forEach((item) => {
      expect(item.url.startsWith("/profile/")).toBe(true);
    });
  });

  it("should verify icon names are valid and expected", () => {
    const validIcons = [
      "profile",
      "profileImage",
      "stats",
      "achievements",
      "sparkle",
      "profileSettings",
    ];

    data.forEach((item) => {
      expect(validIcons.includes(item.icon)).toBe(true);
    });
  });

  it("should check for unique ids across all menu items", () => {
    const ids = data.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should validate the structure of each menu item", () => {
    data.forEach((item) => {
      expect(typeof item.id).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.icon).toBe("string");
      expect(typeof item.url).toBe("string");
      if (item.customLabelStyle) {
        expect(typeof item.customLabelStyle).toBe("string");
      }
      if (item.checked !== undefined) {
        expect(typeof item.checked).toBe("boolean");
      }
    });
  });

  it("should ensure no unexpected properties are present", () => {
    const allowedProperties = [
      "id",
      "title",
      "icon",
      "url",
      "customLabelStyle",
      "checked",
    ];

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        expect(allowedProperties.includes(key)).toBe(true);
      });
    });
  });
});
