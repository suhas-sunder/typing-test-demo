import { useLayoutEffect } from "react";
import loadable from "@loadable/component";
import CalculateTestScore from "../../utils/calculations/CalculateTestScore";
import useTestTimer from "../hooks/useTestTimer";
import useTestStats from "../hooks/useTestStats";
import useTrackStats from "../hooks/useTrackStats";

const GameOverMenu = loadable(() => import("./GameOverMenu"));
const Icon = loadable(() => import("../../utils/other/Icon"));

interface propTypes {
  charStats: string[];
  startTimer: boolean;
  countdownTime?: number;
  difficulty?: string;
  firstInputDetected: boolean;
  showGameOverMenu: boolean;
  charIsValid?: string[];
  accurateKeys: { [key: string]: number };
  troubledKeys: { [key: string]: number };
  handleRestart: () => void;
  showMainMenu: () => void;
  setShowGameOverMenu: (value: boolean) => void;
  endTest: () => void;
  testName: string;
  testLength: number;
}

//Used by speed test and lessons
function TypingStats({
  startTimer,
  countdownTime,
  accurateKeys,
  troubledKeys,
  firstInputDetected,
  showGameOverMenu,
  charIsValid,
  difficulty,
  setShowGameOverMenu,
  handleRestart,
  showMainMenu,
  endTest,
  testName,
  testLength,
}: propTypes) {
  const {
    testStats,
    setTestStats,
    seconds,
    setSeconds,
    displayTimer,
    setDisplayTimer,
  } = useTrackStats({ countdownTime });

  // Update char stats as user input changes
  useTestStats({
    firstInputDetected,
    seconds,
    setTestStats,
    setSeconds,
    accurateKeys,
    charIsValid,
    troubledKeys,
  });

  //Update test time && end test when timer runs out or if all characters are typed
  useTestTimer({
    startTimer,
    endTest,
    countdownTime,
    setShowGameOverMenu,
    seconds,
    showGameOverMenu,
    displayTimer,
    setDisplayTimer,
    setSeconds,
    testLength,
    correct: testStats.correct,
    mistakes: testStats.mistakes,
  });

  //Preload/load all components on component mount
  useLayoutEffect(() => {
    Icon.load();
    GameOverMenu.preload();
  }, []);

  return (
    <div className="fit-content relative flex w-full flex-col items-center justify-center pb-5 pt-3 font-nunito sm:pb-[1.8em] sm:pt-[2em]">
      {!showGameOverMenu ? (
        <ul className="relative flex w-full justify-center gap-2 rounded-xl text-lg leading-7 text-sky-700 sm:max-w-xl sm:justify-evenly sm:gap-6 sm:text-[1.15rem]">
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Words Per Min"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default opacity-0"
            />
            <Icon
              title="paper quill icon"
              icon="paperQuill"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="m-0 inline-flex min-w-[4.3em] justify-center leading-[0]">
              WPM{" "}
              {testStats.wpm > 999
                ? "999"
                : testStats.wpm.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Characters Per Min"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="paper quill icon"
              icon="paperQuill"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[4.48em]  justify-center leading-[0.1]">
              CPM{" "}
              {testStats.cpm.toLocaleString("en-US", {
                minimumIntegerDigits: 3,
                useGrouping: false,
              })}
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Accuracy"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="alarm clock icon"
              icon="circleCheckmark"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[2.95em] justify-center leading-[0]">
              {testStats.accuracy}%
            </span>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* This div adds title as tooltip on hover*/}
            <div
              title="Timer"
              className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full cursor-default  opacity-0"
            />
            <Icon
              title="alarm clock icon"
              icon="clock"
              customStyle="inline-flex text-base sm:text-lg -translate-y-[0.05em]"
            />
            <span className="fit-content m-0 inline-flex min-w-[3.05em] justify-center leading-[0]">
              <span>{displayTimer.min}</span>
              <span className="ml-0.5 mr-0.5">:</span>
              <span>{displayTimer.sec}</span>
            </span>
          </li>
        </ul>
      ) : (
        <GameOverMenu
          handleRestart={handleRestart}
          showMainMenu={showMainMenu}
          difficultyLevel={null}
          difficultyFilters={null}
          testStats={testStats}
          difficulty={difficulty || undefined}
          testTime={typeof countdownTime === "number" ? countdownTime : seconds}
          testName={testName}
          score={CalculateTestScore({
            wpm: testStats.wpm,
            accuracy: testStats.accuracy,
            testTime:
              typeof countdownTime === "number" ? countdownTime : seconds,
            difficultyScore: 3500,
          })}
        />
      )}
    </div>
  );
}

export default TypingStats;
