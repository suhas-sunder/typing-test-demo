import { useContext } from "react";
import { StatsContext } from "../../providers/StatsProvider";

//Used to simplify context fetching for auth context
export default function useStats() {
  return useContext(StatsContext);
}
