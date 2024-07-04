interface PropType {
  userStats: { [key: string]: string | number };
  level: string;
}

export default function HeaderStatsSummary({ userStats, level }: PropType) {
  return (
    <ul className="mt-2 grid w-full grid-cols-2 items-center justify-center gap-y-8 font-nunito text-[0.9rem] sm:grid-cols-4 md:gap-x-2 md:gap-y-10 md:text-base">
      <li className="flex w-full flex-col items-center gap-2 normal-case  md:gap-0">
        Typing Time <span className="flex text-[.7rem]">(dd:hh:mm)</span>
        <span className="mt-1">
          {" "}
          {`${userStats?.totalTypingDays || "00"}:${
            userStats?.totalTypingHours || "00"
          }:${userStats?.totalTypingMins || "00"}`}
        </span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Avg WPM <span className="flex text-[.7rem]">(words per min)</span>
        <span className="mt-1">{userStats?.avgWpm || "0"}</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Words <span className="flex text-[.7rem]">(Typed)</span>
        <span className="mt-1">{userStats?.wordsTyped || "0"}</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Points <span className="flex text-[.7rem]">(Earned)</span>
        <span className="mt-1">{userStats?.totalScore || "0"}</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 normal-case  md:gap-0">
        Achievements <span className="flex text-[.7rem]">(Unlocked)</span>
        <span className="mt-1">0</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Keys <span className="flex text-[.7rem]">(Pressed)</span>
        <span className="mt-1">{userStats?.totalKeysPressed || 0}</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Days <span className="flex text-[.7rem]">(Active)</span>
        <span className="mt-1">{userStats?.totalDaysActive || 0}</span>
      </li>
      <li className="flex w-full flex-col items-center gap-2 md:gap-0">
        Coins <span className="flex text-[.7rem]">(Earned)</span>
        <span className="mt-1">
          {level && parseInt(level) > 1 ? parseInt(level) * 10 : 0}
        </span>
      </li>
    </ul>
  );
}
