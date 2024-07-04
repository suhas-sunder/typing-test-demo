import { useMemo, useState } from "react";
import useHighlightKeys from "../hooks/useHighlightKeys";
import KeyboardData from "../../data/KeyboardData";
import GenerateDefaultStylingForKeys from "../../utils/generators/GenerateDefaultStylingForKeys";
import useKeyPress from "../hooks/useKeyPress";
import Icon from "../../utils/other/Icon";
import { useNavigate } from "react-router-dom";
import RestartMenuBtns from "./RestartMenuBtns";

function KeyboardMenu({ handleRestartLesson }) {
  const navigate = useNavigate();

  return (
    <ul
      id="keyboard-menu"
      className="mt-2 flex items-center justify-center gap-5  lg:translate-x-[1.5em]"
    >
      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
        {/* Keyboard Options, highlight keys before typing, layouts, hide
                  show keyboard and menu */}
      </li>
      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
        {/* Colour Options */}
      </li>
      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
        {/* Sound Options */}
      </li>
      <li>
        <RestartMenuBtns
          handleRestart={handleRestartLesson}
          gameOver={false}
          showMainMenu={() => navigate("/lessons")}
        />
      </li>

      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
        {/* Language Options for Keyboard */}
      </li>
      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
        {/* Hand Overlay Options: Left, Right, Both hands, no hands */}
      </li>
      <li className="translate-y-2 opacity-0">
        <Icon title="star-rating-icon" icon="" customStyle="" />
      </li>
    </ul>
  );
}

//Theres a lot of object/array manipulation for the initial setup so to improve readability it is going into it's own function
function DefaultKeyboardSetup() {
  //Used to track validity of inputs
  const validKeys: string[] = useMemo(() => [], []);

  const keyboardData = useMemo(() => KeyboardData(), []); //Saved presets for keyboard layout

  //Generate list of valid keys from saved data
  Object.values(keyboardData).forEach((row) =>
    row.map((data) => {
      validKeys.push(data.defaultKey);
      validKeys.push(data.shiftKey);
    }),
  );

  //Updating all valid keys with uppercase letters too
  const allValidKeys = useMemo(
    () => [
      ...new Set([...validKeys, ...validKeys.join("").toUpperCase().split("")]),
    ],
    [validKeys],
  );

  //Used to mange styling for each key
  const defaultKeyStyles = useMemo(
    () =>
      GenerateDefaultStylingForKeys({
        keyArr: allValidKeys,
        styling: "bg-white",
      }),
    [allValidKeys],
  );

  return {
    keyboardData,
    defaultKeyStyles,
  };
}

interface PropType {
  cursorPosition: number;
  displayedText: string[];
  showGameOverMenu: boolean;
  handleRestartLesson: () => void;
}

export default function Keyboard({
  cursorPosition,
  displayedText,
  showGameOverMenu,
  handleRestartLesson,
}: PropType) {
  const { defaultKeyStyles, keyboardData } = DefaultKeyboardSetup();

  const [keyStyles, setKeyStyles] = useState<{ [key: string]: string }>(
    defaultKeyStyles,
  );

  useHighlightKeys({
    showGameOverMenu,
    cursorPosition,
    displayedText,
    setKeyStyles,
  });

  const { keyPressed } = useKeyPress(); //Handle key press highlight & toggle between capital and small letters on keyboard

  const handleKeyStyling = (key) => {
    return keyStyles[`${key.shiftKey}`] !== "bg-white"
      ? keyStyles[`${key.shiftKey}`]
      : keyStyles[`${key.defaultKey}`];
  };

  //Apply styling to button based on input keys
  const handleBtnStyle = (key: string) => {
    let style = "flex justify-center items-center  h-full ";

    if (key === " ") {
      style += "  px-[8em] lg:px-[10em]";
    } else if (key === "Enter") {
      style += "  px-6 lg:px-8";
    } else if (key === "Caps" || key === "Option" || key === "Menu") {
      style += "  px-4 lg:px-5";
    } else if (key === "Shift") {
      style += "  px-5 lg:px-6";
    } else {
      style += "px-[1.25em] lg:px-5";
    }

    key.length === 1 ? (style += " min-w-[3.3em]") : (style += " text-xs");

    return style;
  };

  return (
    <>
      <div
        className={`mx-auto mt-8 hidden min-h-[23em] select-none flex-col gap-y-5 rounded-xl border-2 bg-sky-700 p-6 text-xs text-sky-700 md:flex lg:-translate-x-[3.5em] lg:text-base`}
      >
        {Object.values(keyboardData).map((keysArr, index) => {
          return (
            <div key={`keyboard-rows${index}-id`} className="flex gap-3">
              {keysArr.map((key) => (
                <div
                  key={key.id}
                  className={`${
                    keyStyles[`${key.defaultKey} `]
                  } relative flex w-full items-center justify-center`}
                >
                  {key.shiftKey !== "" && (
                    <span
                      className={`absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-1/2 `}
                    >
                      {key.shiftKey}
                    </span>
                  )}
                  <span
                    className={` ${
                      key.defaultKey !== "Shift" &&
                      key.defaultKey !== "Backspace"
                        ? handleKeyStyling(key)
                        : keyPressed !== key.defaultKey
                          ? "bg-white"
                          : ""
                    } ${
                      keyPressed === key.defaultKey &&
                      (keyPressed === "Shift" || keyPressed === "Backspace") &&
                      "bg-sky-500 text-white"
                    } ${handleBtnStyle(key.defaultKey)}  mx-auto rounded-lg`}
                  >
                    <span
                      className={`${
                        key.shiftKey !== "" && "translate-y-[8.5px]"
                      } flex items-center justify-center py-3 `}
                    >
                      {key.defaultKey === " "
                        ? "Spacebar"
                        : keyPressed === "Shift"
                          ? key.defaultKey.toUpperCase()
                          : key.defaultKey.length === 1
                            ? key.defaultKey
                            : key.defaultKey.toUpperCase()}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <KeyboardMenu handleRestartLesson={handleRestartLesson} />
    </>
  );
}
