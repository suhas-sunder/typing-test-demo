import { useEffect } from "react";
import GetWeeklyStats from "../../utils/requests/GetWeeklyStats";
import useAuth from "./useAuth";
import useStats from "./useStats";
import FormatFetchedStats from "../../utils/formatters/FormatFetchedStats";

interface PropType {
  startDate: Date;
  endDate: Date;
}

export default function useUpdateWeeklyStats({ startDate, endDate }: PropType) {
  const { userId } = useAuth();
  const { totalScore } = useStats(); //Since total score is updated in game over menu, using this as state dependency forces weekly stats to update too
  const { setWeeklyStats } = useStats();

  //Update stats
  useEffect(() => {
    const updateWeeklyStats = async () => {
      const data = await GetWeeklyStats({
        userId,
        startDate: endDate.toUTCString(),
        endDate: startDate.toUTCString(),
      });

      const formattedStats = FormatFetchedStats({ data });

      setWeeklyStats({ ...formattedStats });
    };

    userId && updateWeeklyStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, userId, setWeeklyStats, totalScore]);
}

