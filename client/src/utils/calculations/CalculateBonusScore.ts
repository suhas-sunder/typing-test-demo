interface PropType {
  currentDifficulty: string;
  createCustomSetting: boolean;
  difficultySettings: {
    [key: string]: {
      settings: string[];
      selected: boolean;
      default: boolean;
      scoreBonus: number;
    };
  };
  customSettingsChecked: string[];
  difficultyPoints: { [key: string]: { [key: string]: string } };
}

function CalculateBonusScore({
  currentDifficulty,
  createCustomSetting,
  difficultySettings,
  customSettingsChecked,
  difficultyPoints,
}: PropType) {
  let score = 0;

  // reminder difficultyPoints is in menu context and I'm calculating the difficulty points on the fly based on each test setting.
  //I want to refactor this in the future so that the difficulty points are just saved to the database instead of having to recalculate it every single time.

  createCustomSetting
    ? customSettingsChecked.forEach(
        (option) => (score += parseInt(difficultyPoints[option]?.point) || 0),
      )
    : (difficultySettings[currentDifficulty].settings as string[]).forEach(
        (option) => (score += parseInt(difficultyPoints[option]?.point) || 0),
      );

  return score;
}

export default CalculateBonusScore;
