import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import useTestStats from "../components/hooks/useTestStats";
import useTrackInputAccuracy from "../components/hooks/useTrackInputForGames";
import useUpdateLives from "../components/hooks/useUpdateLives";
import CalculatorGameFAQData from "../data/CalculatorGameFAQData";
import DefaultCharsObj from "../data/DefaultCharsObj";
import useTrackStats from "../components/hooks/useTrackStats";
import GenerateCalculations from "../utils/generators/GenerateCalculations";
import CalculatorScreen from "../components/ui/CalculatorScreen";

const RestartMenuBtns = loadable(
  () => import("../components/ui/RestartMenuBtns"),
);
const TriggerMobileKeyboard = loadable(
  () => import("../components/ui/TriggerMobileKeyboard"),
);
const Icon = loadable(() => import("../utils/other/Icon"));
const Hearts = loadable(() => import("../components/ui/Hearts"));
const CalculatorKeys = loadable(
  () => import("../components/ui/CalculatorKeys"),
);
const GameOverMenu = loadable(
  () => import("../components/layout/GameOverMenu"),
);
export default function CalculatorGame() {
  const [lives, setLives] = useState(new Array(4).fill("full"));
  const [startGame, setStartGame] = useState<boolean>(false);
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [calculations, setCalculations] = useState<string[]>([]);
  const [difficultyLevel] = useState<string>("medium");

  const { testStats, setTestStats, validNumpadChars } = useTrackStats({});

  //List of all possible character inputs to track
  const defaultCharsObj = useMemo(() => DefaultCharsObj(), []);
  const faqData = useMemo(() => CalculatorGameFAQData(), []);

  const navigate = useNavigate();

  //Creates a string of calculations (numbers, operations), and 'enter key' symbol to be displayed on calculator
  const handleCalculations = (currentLives: number) => {
    const calcArr = GenerateCalculations({ currentLives });
    setCalculations([...calcArr, "↵"]); //Save string of calculations & add enter to the end to complete each line
  };

  const {
    accurateKeys,
    troubledKeys,
    inputValidity,
    setInputValidity,
    setAccurateKeys,
    setTroubledKeys,
  } = useTrackInputAccuracy({
    displayedText: calculations,
    cursorPosition,
    totalLives: lives.length,
    setCursorPosition,
    setStartGame,
    defaultCharsObj,
    setLives,
    setScore,
    showGameOverMenu,
    startGame,
    validInputKeys: validNumpadChars,
  });

  // Update test testStats as user input changes, wpm, cpm, accuracy, etc.
  useTestStats({
    seconds,
    setTestStats,
    setSeconds,
    accurateKeys,
    troubledKeys,
  });

  //Update lives/hearts
  useUpdateLives({ lives, setSeconds, showGameOverMenu, setShowGameOverMenu });

  const handleRestart = () => {
    setLives(new Array(lives.length).fill("full"));
    setSeconds(0);
    setStartGame(false);
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setInputValidity([]);
    setScore(0);
  };

  //Reset display values based on cursor position
  useEffect(() => {
    if (cursorPosition === 0) handleCalculations(lives.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  //Preload/load all components on component mount
  useLayoutEffect(() => {
    Icon.load();
    Hearts.load();
    CalculatorKeys.load();
    TriggerMobileKeyboard.load();
    RestartMenuBtns.load();
    GameOverMenu.preload();
  }, []);

  return (
    <>
      <header className="mb-[3.8em] flex pt-8 font-nunito">
        <h1 className="flex w-full justify-center text-3xl text-defaultblue">
          Calculator Game
        </h1>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-6 font-nunito">
        {showGameOverMenu ? (
          <GameOverMenu
            handleRestart={handleRestart}
            testStats={testStats}
            score={score}
            testTime={seconds}
            difficulty={difficultyLevel}
            testName="calculator-game"
            showMainMenu={() => navigate("/games")}
          />
        ) : (
          <div className="mt-10 flex w-full max-w-[500px] flex-col gap-8 px-1 pb-2 sm:mt-0 sm:px-5 ">
            <div className="relative  mt-4 flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-5 tracking-wide text-slate-400 sm:min-h-[39.5em] sm:min-w-[28.5em] sm:p-10">
              <div className="bg absolute -top-[5.5em] left-3 flex items-center justify-center gap-1 text-base sm:-top-12">
                <Icon
                  title="trophy-icon"
                  customStyle="text-yellow-500"
                  icon="trophy"
                />
                <span>Score:</span>{" "}
                <span className="flex translate-y-[1px]">
                  {score.toLocaleString()}
                </span>
              </div>
              <Hearts lives={lives} />
              {!startGame && (
                <div className="absolute -left-2 top-6 z-[101] flex w-32 items-center justify-center rounded-xl bg-sky-700 py-[0.5em] tracking-wider text-white opacity-50 sm:-left-4 sm:top-9 sm:w-36">
                  Start Typing!
                </div>
              )}
              <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
                <CalculatorScreen
                  inputValidity={inputValidity}
                  cursorPosition={cursorPosition}
                  calculations={calculations}
                />
                <section id="keypad">
                  <CalculatorKeys
                    cursorPosition={cursorPosition}
                    calculations={calculations}
                    validInputKeys={validNumpadChars}
                    showGameOverMenu={showGameOverMenu}
                  />
                </section>
              </TriggerMobileKeyboard>
            </div>
          </div>
        )}

        {!showGameOverMenu && (
          <RestartMenuBtns
            handleRestart={handleRestart}
            showMainMenu={() => navigate("/games")}
            gameOver={showGameOverMenu}
          />
        )}
        <article className="my-10 flex flex-col gap-4 px-4 font-lora leading-loose tracking-wider text-sky-700">
          <h2 className="mb-4 text-center text-3xl font-bold leading-loose">
            About this game
          </h2>
          {faqData.map((data) => (
            <Fragment key={data.id}>
              {data.title && (
                <h3
                  id={data.id}
                  className="mb-2 text-xl font-semibold leading-loose"
                >
                  {data.title}
                </h3>
              )}
              {data.details && (
                <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
                  {data.details}
                </p>
              )}
            </Fragment>
          ))}
        </article>
      </main>
    </>
  );
}
