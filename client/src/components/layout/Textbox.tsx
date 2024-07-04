import { useCallback, useEffect, useState } from "react";
import styles from "./styles/TextBox.module.css";
import useAuth from "../hooks/useAuth";
import useKeyboardInput from "../hooks/useKeyboardInputForTests";
import useRemoveRowsOnResize from "../hooks/useRemoveRowsOnResize";

interface propTypes {
  charStatus: string[];
  setCharStatus: (index: number, text: string) => void;
  updateStartTimer: (value: boolean) => void;
  dummyText: string;
  cursorPosition: number;
  setCursorPosition: (value: number) => void;
  firstInputDetected: boolean;
  setFirstInputDetected: (value: boolean) => void;
  troubledKeys: { [key: string]: number };
  setTroubledKeys: (value: { [key: string]: number }) => void;
  accurateKeys: { [key: string]: number };
  setAccurateKeys: (value: { [key: string]: number }) => void;
  lessonsPgText: boolean;
}

function HandleCharStyling(status: string) {
  switch (status) {
    case "cursor":
      return `${styles.cursor} text-sky-700 border-current`; //Styling for current char to be typed
    case "error":
      return "text-red-700 bg-red-600/10 rounded-lg"; //Styling for incorrect user input
    case "correct":
      return "text-sky-700 bg-sky-100 rounded-lg"; //Styling for correct user input
    default:
      return;
  }
}
//Used by MainMenu.tsx component
function Textbox({
  charStatus,
  firstInputDetected,
  dummyText,
  cursorPosition,
  setCharStatus,
  updateStartTimer,
  setCursorPosition,
  setFirstInputDetected,
  troubledKeys,
  setTroubledKeys,
  accurateKeys,
  setAccurateKeys,
  lessonsPgText,
}: propTypes) {
  const [charIndexOffset, setCharIndexOffset] = useState<number>(0); //Used to manage # of chars displayed on screen
  const [lastKeyPressed, setLastKeyPressed] = useState<string>(""); //Tracks last key pressed to disable inputs from keys being pressed and held

  const { isAuthenticated } = useAuth();

  // Gets textbox width based on size of browser window
  const getTextBoxWidth = useCallback(() => {
    const textboxElement = document.getElementById("textbox") || null;
    return (textboxElement && textboxElement.offsetWidth) || 0;
  }, []);

  // Gets the max width of each row based on current textbox size.
  const getWidthOfRow = useCallback(() => {
    const charElements = document.getElementsByClassName(`${styles.char}`);
    const widthOfTextBox = getTextBoxWidth(); //Width of the entire text box
    const widthOfEachChar = 24; // width 23px + 2px margin right
    let widthOfTypedChars = 0; // Sum of all widths for COMPLETED chars *currently rendered on screen*
    let index = 0;

    // Calculate the index of the first character on the second row.
    while (widthOfTypedChars < widthOfTextBox && charElements[index]) {
      widthOfTypedChars += widthOfEachChar;
      index++;
    }

    return index; //The final index is the total width of each row.
  }, [getTextBoxWidth]);

  const handleRemoveRows = useCallback(() => {
    const widthOfAllCharsPerRow = getWidthOfRow();

    let maxRows: number = 10; //This is the maximum additional rows we can have before a row is removed

    while (maxRows > 1) {
      if (
        cursorPosition >
        charIndexOffset + widthOfAllCharsPerRow * maxRows - 3 // Subtract by 2 because we want two character spaces after the 2nd row before removing a row
      ) {
        setCharIndexOffset(
          charIndexOffset + widthOfAllCharsPerRow * (maxRows - 1) - 1, // Subtract count by 1 because we want to preserve one row.
        );
        maxRows = 0; //Exit loop
      }

      maxRows--;
    }
  }, [charIndexOffset, getWidthOfRow, cursorPosition]);

  useRemoveRowsOnResize(handleRemoveRows); //Remove completed rows of text when screen is resized.

  //Handles keyboard input validation
  useKeyboardInput({
    setFirstInputDetected,
    lastKeyPressed,
    handleRemoveRows,
    dummyText,
    setCharStatus,
    updateStartTimer,
    cursorPosition,
    charIndexOffset,
    firstInputDetected,
    getWidthOfRow,
    setCursorPosition,
    troubledKeys,
    setTroubledKeys,
    accurateKeys,
    setAccurateKeys,
    setCharIndexOffset,
    setLastKeyPressed,
  });

  // When test starts, scroll textbox into view.
  useEffect(() => {
    const handleAutoScroll = () => {
      if (isAuthenticated && window.innerWidth < 768) {
        window.scrollTo(0, 87); //Scroll page to top for small screens after login
      } else if (isAuthenticated) {
        window.scrollTo(0, 280); //Scroll page to top for large screens after login
      } else if (window.innerWidth < 768) {
        window.scrollTo(0, 130); //Scroll page to top for small screens when logged out
      } else {
        window.scrollTo(0, 510); //Scroll page to top for large screens when logged out
      }
    };

    !lessonsPgText && handleAutoScroll();
  }, [isAuthenticated, lessonsPgText]);

  return (
    <div
      autoFocus
      className={`${
        lessonsPgText ? styles["lessons"] : styles["typing-test"]
      } ${
        !lessonsPgText && "border border-sky-50 shadow-inner"
      } relative mx-5 flex overflow-hidden rounded-lg px-3 py-5 text-base leading-[2.72em]  sm:mx-10`}
    >
      <p
        data-testid="textbox"
        id="textbox"
        className={`relative -mt-2 block text-center text-3xl`}
      >
        {dummyText.split("").map((word: string, index: number) => {
          if (index >= charIndexOffset + 0 && index <= charIndexOffset + 450) {
            return word === " " ? (
              <span
                key={index}
                className={`${
                  styles.char
                } border-b-grey-100 relative mb-3 mr-0.5 inline-flex justify-center border-b-2 py-2  ${
                  index === cursorPosition
                    ? HandleCharStyling("cursor")
                    : HandleCharStyling(charStatus[index])
                }`}
              >
                &nbsp;
              </span>
            ) : (
              <span
                key={index}
                className={`${
                  styles.char
                } border-b-grey-100 relative mb-3 mr-0.5 inline-flex justify-center border-b-2 py-2 ${
                  index === cursorPosition
                    ? HandleCharStyling("cursor")
                    : HandleCharStyling(charStatus[index])
                }`}
              >
                {word}
              </span>
            );
          }
        })}
      </p>
    </div>
  );
}

export default Textbox;
