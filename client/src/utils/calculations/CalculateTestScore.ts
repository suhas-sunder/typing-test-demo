export default function CalculateTestScore({
  wpm,
  accuracy,
  testTime,
  difficultyScore,
}) {
  //Base difficulty score times 1 min + test time/Max test time + wpm % * penalize wpm below 40 so that if user doesn't type much or is too slow, they don't score too high * test accuracy %.
  const penalizeScore =
    (wpm <= 20 ? 0.5 : 1) * (wpm <= 30 ? 0.25 : 1) * (wpm < 40 ? 0.25 : 1);

  const rewardHighScore = wpm / 40 > 1 ? 1 : wpm / 40;

  const percentAccuracy = accuracy / 100;

  const testTimeBonus = 1 + testTime / (60 * 10) + wpm / 100; //Bonus for each min added with a sprinkle added based on wpm

  const testScore = Math.ceil(
    difficultyScore *
      testTimeBonus *
      percentAccuracy *
      rewardHighScore *
      penalizeScore,
  );
  return Math.abs(testScore);
}
