import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import loadable from "@loadable/component";
import useTestDependencies from "../components/hooks/useTestDependencies";
import ValidateChars from "../utils/validation/ValidateChars";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import useLessonText from "../components/hooks/useLessonText";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LessonNavData from "../data/LessonNavData";

const Keyboard = loadable(() => import("../components/ui/Keyboard"));
const TriggerMobileKeyboard = loadable(
  () => import("../components/ui/TriggerMobileKeyboard"),
);
const Textbox = loadable(() => import("../components/layout/Textbox"));
const TypingStats = loadable(() => import("../components/layout/TypingStats"));

function Lesson() {
  const {
    lessonIndex,
    levelIndex,
    sectionIndex,
    lessonName,
    sectionName,
    levelName,
    lessonText,
  } = useLessonText(); //gets lesson text and data obtained from pathname

  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    cursorPosition,
    accurateKeys,
    troubledKeys,
    navigate,
    setStartTimer,
    handleEndTest,
    clearTestData,
    setCursorPosition,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  } = useTestDependencies({ defaultText: lessonText });

  const { fadeAnim } = useLoadAnimation();

  // / Preload all lazy-loaded components after delay
  useLayoutEffect(() => {
    Textbox.load();
    TypingStats.load();
    TriggerMobileKeyboard.load();
    Keyboard.load();
  }, []);

  const [navPageLinks, setNavPageLinks] = useState({
    prevPageUrl: "",
    nextPageUrl: "",
  });

  const lessonNavData: string[] = useMemo(() => LessonNavData(), []);

  const location = useLocation();

  //Handles page navigation pathname
  useEffect(() => {
    if (lessonNavData.length <= 0 || !lessonNavData) return;
    const loc = location.pathname;
    const lessonIndex = lessonNavData.indexOf(loc);

    console.log(lessonIndex, lessonNavData[lessonIndex + 1]);

    if (lessonIndex - 1 >= 0)
      setNavPageLinks((prevState) => ({
        ...prevState,
        prevPageUrl: lessonNavData[lessonIndex - 1],
      }));

    if (lessonIndex + 1 <= lessonNavData.length)
      setNavPageLinks((prevState) => ({
        ...prevState,
        nextPageUrl: lessonNavData[lessonIndex + 1],
      }));
  }, [lessonNavData, location]);

  return (
    <div
      className={` ${fadeAnim} mx-auto flex max-w-[1200px] flex-col pb-12 pt-3`}
    >
      <header className=" mt-2 flex flex-col items-center justify-center gap-2">
        <div className="flex w-full max-w-[600px] justify-between gap-8 px-5">
          <Link
            to={navPageLinks.prevPageUrl}
            className="mr-auto whitespace-nowrap rounded-xl border-2 border-slate-200 px-3 py-1 font-nunito text-sm text-slate-400 hover:border-slate-400 hover:text-slate-600"
          >
            Prev Lesson
          </Link>
          <Link
            to={navPageLinks.nextPageUrl}
            className="ml-auto whitespace-nowrap rounded-xl border-2 border-slate-200 px-3 py-1 font-nunito text-sm text-slate-400 hover:border-slate-400 hover:text-slate-600"
          >
            Next Lesson
          </Link>
        </div>
        <h1
          className={`${
            showGameOverMenu ? "mb-5" : "mb-2"
          } mt-2 flex w-full items-center justify-center  font-nunito text-xs  text-defaultblue sm:gap-2 md:text-sm`}
        >
          <span className=" translate-y-[1px] ">
            Lesson {lessonIndex + 1} - Section {sectionIndex + 1} - Level{" "}
            {levelIndex + 1}
          </span>{" "}
          <span className="hidden translate-y-[1px] sm:flex">
            ({lessonName} - {sectionName} - {levelName})
          </span>
        </h1>
      </header>
      <main className="relative mx-auto flex max-w-[900px] flex-col">
        <TypingStats
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          charStats={charIsValid}
          charIsValid={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showMainMenu={() => navigate("/lessons")}
          showGameOverMenu={showGameOverMenu}
          difficulty={lessonName}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"lesson"}
          testLength={lessonText.length}
        />
        {!showGameOverMenu && (
          <>
            <div className="sm:-translate-y-4">
              {" "}
              {!startTimer && (
                <div className="absolute -left-4 top-[3.5em] z-10 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white opacity-50 sm:-top-8">
                  Start Typing!
                </div>
              )}
              <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
                <Textbox
                  charStatus={charIsValid}
                  setCharStatus={(cursorIndex, newValue) =>
                    ValidateChars({ setCharIsValid, cursorIndex, newValue })
                  }
                  updateStartTimer={setStartTimer}
                  dummyText={lessonText}
                  cursorPosition={cursorPosition}
                  setCursorPosition={setCursorPosition}
                  firstInputDetected={firstInputDetected}
                  setFirstInputDetected={setFirstInputDetected}
                  troubledKeys={troubledKeys}
                  setTroubledKeys={setTroubledKeys}
                  accurateKeys={accurateKeys}
                  setAccurateKeys={setAccurateKeys}
                  lessonsPgText={true}
                />
              </TriggerMobileKeyboard>
            </div>
            <section
              id="keyboard"
              className="hidden min-h-[23em] -translate-y-3 flex-col items-center justify-center gap-6 md:flex lg:min-h-[23em]"
            >
              <Keyboard
                handleRestartLesson={clearTestData}
                displayedText={lessonText}
                cursorPosition={cursorPosition}
              />
            </section>
          </>
        )}

        <div className="mt-10 flex flex-col gap-5 px-5 text-slate-600">
          <h2 className="text-center font-lora text-2xl">Lesson Details</h2>
          <ul className="flex flex-col items-center justify-center gap-4 font-lato text-xl">
            <li className="flex gap-3">
              <span>Lesson {lessonIndex + 1}:</span> <span>{lessonName}</span>
            </li>
            <li>
              Section {sectionIndex + 1}: {sectionName}
            </li>
            <li>
              Level {levelIndex + 1}: "{levelName}"
            </li>
          </ul>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Lesson;
