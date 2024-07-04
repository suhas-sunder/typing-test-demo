import { describe, it, expect } from "vitest";
import CalculateBonusScore from "../CalculateBonusScore";

describe("should render defaults", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: true,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: ["option1", "option2"],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "10" } },
  };

  const data = CalculateBonusScore(props);
  it("should calculate score correctly when createCustomSetting is true", () => {
    expect(data).toBe(15);
  });
});

it("should calculate score correctly when createCustomSetting is false", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1", "option2"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "10" } },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(15);
});

it("should correctly parse integer values from difficultyPoints", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: true,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: ["option1"],
    difficultyPoints: { option1: { point: "5" } },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(5);
});

it("should return zero when no settings are selected", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: true,
    difficultySettings: {
      easy: { settings: [], selected: true, default: true, scoreBonus: 10 },
    },
    customSettingsChecked: [],
    difficultyPoints: {},
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(0);
});

it("should handle default difficulty settings correctly", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
      medium: {
        settings: ["option2"],
        selected: false,
        default: false,
        scoreBonus: 20,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "10" } },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(5);
});

it("should handle missing difficultyPoints for a given option", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1", "option3"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "5" } },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(5);
});

it("should handle non-integer values in difficultyPoints", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1", "option2"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "abc" } },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(5);
});

it("should handle empty customSettingsChecked array", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: true,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: {},
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(0);
});

it("should handle empty settings array in difficultySettings", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: { settings: [], selected: true, default: true, scoreBonus: 10 },
    },
    customSettingsChecked: [],
    difficultyPoints: {},
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(0);
});

it("should handle non-existent currentDifficulty in difficultySettings", () => {
  const props = {
    currentDifficulty: "nonExistent",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
      medium: {
        settings: ["option2"],
        selected: false,
        default: false,
        scoreBonus: 20,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "10" } },
  };
  expect(() => CalculateBonusScore(props)).toThrow();
});

it("should calculate score correctly when handling a large number of settings", () => {
  const props = {
    currentDifficulty: "hard",
    createCustomSetting: false,
    difficultySettings: {
      hard: {
        settings: ["option1", "option2", "option3"],
        selected: true,
        default: true,
        scoreBonus: 20,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: {
      option1: { point: "5" },
      option2: { point: "10" },
      option3: { point: "15" },
    },
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(30);
});

it("should return a number type", () => {
  const props = {
    currentDifficulty: "medium",
    createCustomSetting: false,
    difficultySettings: {
      medium: {
        settings: ["option1", "option2"],
        selected: true,
        default: true,
        scoreBonus: 20,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: { option1: { point: "15" }, option2: { point: "25" } },
  };
  const data = CalculateBonusScore(props);
  expect(typeof data).toBe("number");
});

it("should return 0 when difficultyPoints object is empty", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: false,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: [],
    difficultyPoints: {},
  };
  const data = CalculateBonusScore(props);
  expect(data).toBe(0);
});

it("should not mutate input parameters", () => {
  const props = {
    currentDifficulty: "easy",
    createCustomSetting: true,
    difficultySettings: {
      easy: {
        settings: ["option1"],
        selected: true,
        default: true,
        scoreBonus: 10,
      },
    },
    customSettingsChecked: ["option1", "option2"],
    difficultyPoints: { option1: { point: "5" }, option2: { point: "10" } },
  };
  const originalProps = { ...props };
  CalculateBonusScore(props);
  expect(props).toEqual(originalProps);
});
