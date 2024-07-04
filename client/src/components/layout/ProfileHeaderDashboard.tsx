import useLifetimeStats from "../hooks/useUpdateLifetimeStats";
import loadable from "@loadable/component";
import useLevelMastery from "../hooks/useLevelMastery";
import { useLayoutEffect } from "react";

const ProfileImg = loadable(() => import("./ProfileImg"));
const HeaderStatsSummary = loadable(() => import("./HeaderStatsSummary"));

//Displays dashboard with weekly stats when user is logged in
//Used by Home.tsx
export default function ProfileHeaderDashboard() {
  const { level, nextMilestone, masteryName, lifetimeStats } =
    useLevelMastery();

  useLifetimeStats();

  useLayoutEffect(() => {
    ProfileImg.load();
    HeaderStatsSummary.load();
  }, []);

  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-0">
      <ProfileImg
        level={level}
        nextMilestone={nextMilestone}
        redirectUrl={"/profile/img"}
        mastery={masteryName}
      />
      <div className=" flex w-full flex-col gap-5 tracking-wide md:gap-6">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative flex justify-center gap-1 font-roboto text-[1.72rem] leading-8 text-sky-200 sm:mb-0 sm:text-[1.16rem] md:pl-3 md:text-[1.72rem] md:leading-9">
            <span className="hidden md:flex">My</span> <span>Lifetime</span>{" "}
            <span>Summary</span>
          </h1>
        </div>
        <HeaderStatsSummary userStats={lifetimeStats} level={level} />
      </div>
    </div>
  );
}
