import { useEffect } from "react";
import useAuth from "./useAuth";
import useStats from "./useStats";
import FormatFetchedStats from "../../utils/formatters/FormatFetchedStats";
import GetLifetimeStats from "../../utils/requests/GetLifetimeStats";

export default function useUpdateLifetimeStats() {
  const { userId } = useAuth();
  const { totalScore } = useStats(); //Since total score is updated in game over menu, using this as state dependency forces weekly stats to update too
  const { setLifetimeStats } = useStats();

  //Update stats
  useEffect(() => {
    const updateLifetimeStats = async () => {
      const data = await GetLifetimeStats({
        userId,
      });

      const formattedStats = FormatFetchedStats({ data });

      setLifetimeStats({ ...formattedStats });
    };

    userId && updateLifetimeStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, setLifetimeStats, totalScore]);
}
