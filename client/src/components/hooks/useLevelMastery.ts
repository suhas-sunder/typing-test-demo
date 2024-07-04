import { useEffect, useMemo, useState } from "react";
import CalculateLevelMilestones from "../../utils/calculations/CalculateLevelMilestones";
import useStats from "./useStats";

function useLevelMastery() {
  const { level, setLevel } = useStats();
  const [weeklyLevel, setWeeklyLevel] = useState<number>(0);
  const [nextMilestone, setNextMilestone] = useState<number>(0);
  const [masteryName, setMasteryName] = useState<string>("");

  const { lifetimeStats, totalScore, weeklyStats } = useStats();

  const levelMilestones = useMemo(
    () =>
      CalculateLevelMilestones({
        totalScore,
      }),
    [totalScore],
  );

  //Used to calculate level earned for a specific week
  const weeklyLevelMilestones = useMemo(
    () =>
      CalculateLevelMilestones({
        totalScore: weeklyStats.totalScore
          ? parseInt((weeklyStats?.totalScore as string)?.split(",").join(""))
          : 0,
      }),
    [weeklyStats.totalScore],
  );

  // Calculate level and milestone
  useEffect(() => {
    const handleLevelMilestone = () => {
      const { level, milestone, mastery } = levelMilestones;
      const { level: weeklyLevel } = weeklyLevelMilestones;

      setWeeklyLevel(weeklyLevel);
      setLevel(level);
      setNextMilestone(milestone);
      setMasteryName(mastery);
    };
    handleLevelMilestone();
  }, [levelMilestones, setLevel, totalScore, weeklyLevelMilestones]);

  return {
    level,
    weeklyLevel,
    nextMilestone,
    masteryName,
    lifetimeStats,
    weeklyStats,
  };
}

export default useLevelMastery;
