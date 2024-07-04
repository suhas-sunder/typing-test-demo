import { useEffect } from "react";
import GetTotalScore from "../../utils/requests/GetTotalScore";
import useAuth from "./useAuth";
import PostTestStats from "../../utils/requests/PostTestStats";
import useStats from "./useStats";

//Update relevant test stats when game ends
export default function useUpdateAllStats({
  setDisplayBestStats,
  difficultySettings,
  currentDifficulty,
  testName,
  difficulty,
  testStats,
  score,
  testTime,
}) {
  const { userId } = useAuth();
  const { setTotalScore } = useStats();

  useEffect(() => {
    //Updates score in context, therefore updating nav bar score
    const updateScoreInContext = async () => {
      const result = await GetTotalScore({ userId }); // If score is already calculated by component use score (some components like games display score to user, so score info already exists), otherwise calculate score using utility function
      setTotalScore(result);
    };

    // If data in handleSaveStats is saved successfully, update score on nav bar
    const handleSaveStats = async (props) => {
      const updateStatsOnDB = await PostTestStats({ ...props });

      if (updateStatsOnDB === "update header score") {
        updateScoreInContext();
        setDisplayBestStats(true);
      } else {
        console.log("Error updating score on nav bar");
      }
    };

    // Save typing testStats to db if user is logged in
    if (userId || parseInt(userId) === 0) {
      const difficulty_settings =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].settings
          : [];

      const difficultyScore =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].scoreBonus
          : 0;

      const difficultyLevel =
        testName === "speed-test"
          ? difficultySettings[currentDifficulty.toLowerCase()].difficultyLevel
          : difficulty;

      // Save test testStats to database
      handleSaveStats({
        wpm: testStats.finalWPM,
        cpm: testStats.finalCPM,
        test_score: score,
        correct_chars: testStats.correct,
        misspelled_chars: testStats.mistakes,
        total_chars: testStats.correct + testStats.mistakes,
        test_accuracy: testStats.accuracy,
        test_time_sec: testTime,
        difficultyLevel,
        test_name: testName,
        user_id: userId.toString(),
        difficulty_settings,
        difficulty_name:
          testName === "speed-test" ? currentDifficulty : difficultyLevel,
        difficultyScore,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
