import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import GetBestStats from "../../utils/requests/GetBestStats";
import loadable from "@loadable/component";
import FormatTime from "../../utils/formatters/FormatTime";
import { v4 as uuidv4 } from "uuid";

const Icon = loadable(() => import("../../utils/other/Icon"));

type PropType = {
  userId: string;
  difficultyLevel?: string;
  testName?: string;
  gameOver?: boolean;
};

//Used by GameOverMenu.tsx and ProfileStats.tsx
export default function BestStats({
  userId,
  difficultyLevel,
  testName,
  gameOver,
}: PropType) {
  const [bestStats, setBestStats] = useState<
    {
      title: string;
      id: string;
      testName: string;
      finalWPM: number;
      finalCPM: number;
      createdAt: Date;
      seconds: number;
      accuracy: number;
      score: number;
      chars: string;
      words: number;
      difficultyName: string;
      difficultyLevel: string;
      difficultyFilters: string[];
    }[]
  >([]);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [customStyle, setCustomStyle] = useState<string>("");

  useEffect(() => {
    const fetchBestStats = async () => {
      const result = await GetBestStats({
        userId,
        testName,
        difficultyLevel,
      });

      setBestStats((prevState) => ({ ...prevState, ...result }));
    };

    fetchBestStats();
  }, [difficultyLevel, testName, userId, gameOver]);

  // Determine styling depending on if this component is called by a game over menu or by profile stats
  useEffect(() => {
    gameOver
      ? setCustomStyle(
          `${
            toggleMenu ? "max-h-[150em]" : "max-h-[20em]"
          } group relative mb-6 mt-2 flex w-full max-w-[90%]  cursor-pointer flex-col items-center gap-7  overflow-hidden rounded-lg border-2 px-10 pb-14 pt-10 font-nunito capitalize tracking-wider transition-all delay-150 duration-150 ease-in-out`,
        )
      : setCustomStyle(
          "flex flex-col justify-center items-center gap-10 max-w-[70%] w-full",
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, toggleMenu]);

  useLayoutEffect(() => {
    Icon.load();
  }, []);

  const handleFormatTime = (sec: number) => {
    const { hours, minutes, seconds } = FormatTime(sec);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      onClick={() => setToggleMenu((prevState) => !prevState)}
      className={customStyle}
    >
      {gameOver && (
        <>
          <button className="absolute bottom-0 z-10 flex h-10 w-full items-center justify-center gap-3 bg-defaultblue tracking-widest text-sky-300 opacity-80 transition-all group-hover:h-12 group-hover:text-sky-200 group-hover:opacity-90">
            <span>
              <Icon
                title="settings-icon"
                customStyle=""
                icon={toggleMenu ? "doubleArrowUp" : "doubleArrowDown"}
              />
            </span>
            <span>{toggleMenu ? "Hide Stats" : "Display All Stats"}</span>
            <span>
              <Icon
                title="settings-icon"
                customStyle=""
                icon={toggleMenu ? "doubleArrowUp" : "doubleArrowDown"}
              />
            </span>
          </button>
          <div className="flex flex-col items-center justify-center gap-7 px-4 text-center font-nunito tracking-wider">
            <h2 className="font-lora text-xl tracking-widest text-defaultblue  underline underline-offset-8 sm:no-underline">
              Achievements
            </h2>
            <ul className="grid grid-cols-3 text-center text-sky-700">
              <li>*</li>
              <li>*</li>
              <li>*</li>
            </ul>
          </div>
        </>
      )}

      {Object.values(bestStats).map((stats) => (
        <Fragment key={stats.id}>
          <h2 className="font-lora text-xl tracking-widest text-defaultblue underline underline-offset-8 sm:no-underline">
            {stats.title}
          </h2>
          <ul className="grid w-full  items-center justify-center gap-y-3 text-center text-sky-700 sm:grid-cols-3">
            <li className={`${stats.id === "best-wpm" && "text-yellow-600"}`}>
              WPM: {stats?.finalWPM || 0}
            </li>
            <li>CPM: {stats?.finalCPM || 0}</li>
            <li>Accuracy: {stats?.accuracy || 0}%</li>
            <li
              className={`${stats.id === "best-score" && "text-yellow-600"} `}
            >
              Score: {stats?.score?.toLocaleString() || 0}
            </li>
            <li className={`${stats.id === "best-words" && "text-yellow-600"}`}>
              Words: {stats?.words || 0}
            </li>
            <li>Chars: {stats?.chars || 0}</li>
          </ul>
          <div
            className={`${
              stats.id === "best-time" && "text-yellow-600"
            } -translate-y-2 text-base normal-case  text-sky-700`}
          >
            Time (hh:mm:ss): {handleFormatTime(stats?.seconds as number)}
          </div>
          <ul className="grid w-full -translate-y-2 grid-cols-1 items-center justify-between gap-y-8 border-b-2 pb-10  text-center text-sm capitalize text-slate-600 sm:grid-cols-2 sm:flex-row">
            <li>Test: {(stats?.testName as string)?.split("-").join(" ")}</li>
            <li>
              Date:{" "}
              {new Date(stats?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              <span className="text-slate-500">
                (
                {new Date(stats.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </span>{" "}
            </li>
            {/* Display difficulty level but also custom difficulty name if it exists */}
            <li className="sm:col-span-2">
              Difficulty: {stats?.difficultyLevel || difficultyLevel}{" "}
            </li>
            {stats?.difficultyFilters?.length > 0 &&
              !testName?.includes("lesson") && (
                <>
                  {stats?.difficultyName !== stats?.difficultyLevel &&
                    difficultyLevel?.toLowerCase() !==
                      stats?.difficultyLevel.toLowerCase() && (
                      <li className="break-all text-red-500 sm:col-span-2">
                        Custom Difficulty: {stats?.difficultyName}
                      </li>
                    )}
                  <li className="text-red-500 sm:col-span-2">
                    Difficulty Filters:{" "}
                    <span>
                      <ul className="mt-4 flex flex-col text-xs text-red-500">
                        {stats?.difficultyFilters.map((filters, index) => (
                          <Fragment key={uuidv4()}>
                            <li>{filters}</li>
                            {index !== stats?.difficultyFilters.length - 1 && (
                              <div className="flex justify-center text-lg text-red-100">
                                +
                              </div>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    </span>
                  </li>
                </>
              )}
          </ul>
        </Fragment>
      ))}

      <h2 className="font-lora text-xl tracking-widest  text-defaultblue ">
        Troubled Keys
      </h2>
      <div>coming soon...</div>
    </div>
  );
}
