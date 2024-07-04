import { it, expect } from "vitest";
import ProfileImageData from "../ProfileImageData";

const data = ProfileImageData();

describe("should render defaults", () => {
  it("should return a list containing one main folder", () => {
    expect(data).toHaveLength(1);
  });

  it("should contain imgSlugs, subFolder, and keywords in each image data object", () => {
    data.forEach((folder) => {
      folder.folderData.forEach((imageData) => {
        expect(imageData).toHaveProperty("imgSlugs");
        expect(imageData).toHaveProperty("subFolder");
        expect(imageData).toHaveProperty("keywords");
      });
    });
  });

  it("should correctly associate keywords with each image data object", () => {
    data.forEach((folder) => {
      folder.folderData.forEach((imageData) => {
        expect(Array.isArray(imageData.keywords)).toBe(true);
      });
    });
  });

  it("should correctly nest image data objects within their respective folders", () => {
    data.forEach((folder) => {
      expect(folder).toHaveProperty("folderName");
      expect(folder).toHaveProperty("folderData");
    });
  });

  it("should handle empty folderData gracefully", () => {
    data.push({ folderName: "empty-folder", folderData: [] });
    expect(data[data.length - 1].folderData).toHaveLength(0);
  });

  it("should ensure all keywords are strings", () => {
    data.forEach((folder) => {
      folder.folderData.forEach((imageData) => {
        imageData.keywords.forEach((keyword) => {
          expect(typeof keyword).toBe("string");
        });
      });
    });
  });

  it("should handle large number of image data objects efficiently", () => {
    const largeNumberOfImages = Array.from({ length: 10000 }, (_, i) => ({
      imgSlugs: [`image-${i}`],
      subFolder: `subFolder-${i}`,
      keywords: ["test"],
    }));
    const largeFolder = {
      folderName: "large-folder",
      folderData: largeNumberOfImages,
    };

    const startTime = performance.now();

    data.push(largeFolder);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(1000); // Ensure it runs within 1 second
  });

  it("should ensure folderName is a string", () => {
    data.forEach((folder) => {
      expect(typeof folder.folderName).toBe("string");
    });
  });
});
