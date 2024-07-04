import { useEffect, useState, useMemo } from "react";
import Icon from "../../utils/other/Icon";
import useUpdateWeeklyStats from "../hooks/useWeeklyStats";
import GenerateStartEndDates from "../../utils/calculations/CalculateStartEndDates";
import useLevelMastery from "../hooks/useLevelMastery";
import ProfileImg from "./ProfileImg";
import HeaderStatsSummary from "./HeaderStatsSummary";

type SquareArrowProps = {
  customStyle: string;
  handleClick: () => void;
};
function SquareArrowBtn({ customStyle, handleClick }: SquareArrowProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${customStyle} flex cursor-pointer items-center justify-center hover:scale-105 hover:text-defaultgreen`}
    >
      <Icon
        icon="chevron"
        title="Left Arrow Button"
        customStyle="inline-flex rotate-90 text-white scale-75 md:scale-100 "
      />
      <div className="absolute flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50 md:h-7 md:w-7"></div>
    </button>
  );
}

//Handles weekly date adjustment and display functionality
function DateMenuWeekly() {
  const { generatedStartDate, generatedEndDate } = useMemo(
    () => GenerateStartEndDates({ numWeeksBeforeToday: 0 }),
    [],
  );

  const [numWeeksBeforeToday, setNumWeeksBeforeToday] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(generatedStartDate);
  const [endDate, setEndDate] = useState<Date>(generatedEndDate);

  const [startSwitchingDates, setStartSwitchingDates] =
    useState<boolean>(false); //Ensures date isn't switched unnecessairly on load which causes weekly stats to update too many times unnecessairly

  useUpdateWeeklyStats({ startDate, endDate }); //update weekly stats

  const handleLeftArrow = () => {
    setNumWeeksBeforeToday((PrevState) => PrevState + 1);
    setStartSwitchingDates(true);
  };

  const handleRightArrow = () => {
    if (numWeeksBeforeToday > 0) {
      setNumWeeksBeforeToday((PrevState) =>
        PrevState - 1 <= 0 ? 0 : PrevState - 1,
      );
      setStartSwitchingDates(true);
    }
  };

  //Update start and end date by shifting it by a certain number of weeks before today.
  useEffect(() => {
    const handleShiftDate = () => {
      const { generatedStartDate, generatedEndDate } = GenerateStartEndDates({
        numWeeksBeforeToday,
      });

      setStartDate(generatedStartDate);
      setEndDate(generatedEndDate);
    };

    startSwitchingDates && handleShiftDate(); //This ensures this component doesn't run until a date switch operation has been triggered
  }, [startSwitchingDates, numWeeksBeforeToday, setStartDate, setEndDate]);

  return (
    <div className="min-h-7 flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-center md:gap-2 lg:gap-4">
      <div className="flex min-w-[14.1em] items-center justify-between md:min-w-[16.3em]">
        <SquareArrowBtn handleClick={handleLeftArrow} customStyle="" />
        <div className="flex items-center justify-center gap-1 text-sm text-sky-100 md:text-base ">
          <p className="whitespace-pre">
            {new Date(endDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </p>
          <Icon
            icon="horizontalLine"
            title="horizontal line icon"
            customStyle="scale-75 text-sky-200"
          />
          <p className="whitespace-pre">
            {new Date(startDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <SquareArrowBtn
          handleClick={handleRightArrow}
          customStyle="rotate-180"
        />
      </div>
    </div>
  );
}

//Displays dashboard with weekly stats when user is logged in
//Used by Home.tsx
export default function HeaderDashboard() {
  const { level, nextMilestone, weeklyLevel, masteryName, weeklyStats } =
    useLevelMastery();

  return (
    <div className="mx-auto mb-auto flex flex-col gap-10  sm:w-full sm:flex-row sm:gap-0">
      <ProfileImg
        nextMilestone={nextMilestone}
        level={level}
        mastery={masteryName}
        redirectUrl={"/profile/summary"}
      />
      <div className=" flex w-full flex-col gap-5 tracking-wide md:gap-6">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="relative mb-6 flex justify-center gap-1 font-roboto text-[1.72rem] leading-8 text-sky-200 sm:mb-0 sm:text-[1.16rem] md:pl-3 md:text-[1.72rem] md:leading-9">
            <span className="hidden md:flex">My</span> <span>Weekly</span>{" "}
            <span>Summary</span>
          </h1>
          <DateMenuWeekly />
        </div>
        <HeaderStatsSummary
          userStats={weeklyStats}
          level={weeklyLevel.toString()}
        />
      </div>
    </div>
  );
}
