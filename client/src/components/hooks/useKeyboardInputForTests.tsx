import { useEffect } from "react";

//Handles keyboard input validation and used by Textbox.tsx This is different from useTrackInputAccuracy for games because it manages and resets row sizes and cursor position so the data manipulated is completely different from that of games
function useKeyboardInput(props) {
  const {
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
  } = props;

  useEffect(() => {
    // Manage cursor position and store input validity to state
    const handleCursorPosition = (key: string) => {
      if (!dummyText[cursorPosition]) return; //If cursor position exceeds available text then don't check inputs

      const currentChar = dummyText[cursorPosition].toLowerCase();

      if (key === "Backspace") {
        if (
          charIndexOffset + cursorPosition > getWidthOfRow() &&
          cursorPosition - charIndexOffset === 0
        )
          setCharIndexOffset(charIndexOffset - getWidthOfRow());

        if (cursorPosition - 1 >= 0)
          setCursorPosition((prevState) => prevState - 1); //Subtract position offset until characters are reset back to 0 position
        setCharStatus(cursorPosition - 1, "");
      } else if (dummyText[cursorPosition] === key) {
        //Update accurate key status in state object & increase character offset by one
        setCursorPosition((prevState) => prevState + 1);
        setCharStatus(cursorPosition, "correct");
        if (accurateKeys[currentChar] || accurateKeys[currentChar] === 0) {
          setAccurateKeys({
            ...accurateKeys,
            [currentChar]: accurateKeys[currentChar] + 1,
          });
        }
      } else {
        //Update mistake key status in state object & increase character offset by one
        setCursorPosition((prevState) => prevState + 1);
        setCharStatus(cursorPosition, "error");
        if (troubledKeys[currentChar] || troubledKeys[currentChar] === 0) {
          setTroubledKeys({
            ...troubledKeys,
            [currentChar]: troubledKeys[currentChar] + 1,
          });
        }
      }
    };

    //Manage various keydown events based on requirements/restrictions of this typing test
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") return; //Allow tab for accessability reasons but don't track the input for test

      e.preventDefault();
      const pattern = /(^[ A-Za-z0-9_@./#&+\-,;'`"()*^%$!|:~=-{}–·¯©]$)/; //Check for space bar, letters, numbers, and special characters

      // Only validates input if input is within scope of test
      if (
        pattern.test(e.key) ||
        e.key === "Tab" ||
        e.key === "Enter" ||
        e.key === "Backspace"
      ) {
        if (e.key !== "Backspace" && !firstInputDetected) {
          updateStartTimer(true); //Start timer in TypingStats component.
          setFirstInputDetected(true); //Prevents timer from resetting on further user inputs.
        }

        if (e.key !== "Backspace") handleRemoveRows(); //If completed rows > 2, remove all rows except one.

        if (lastKeyPressed !== e.key || e.key === "Backspace") {
          handleCursorPosition(e.key); //Validate input and adjust cursor position/char index
          setLastKeyPressed(e.key);
        }
      }
    };

    const handleKeyUp = () => {
      setLastKeyPressed("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
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
  ]);
}

export default useKeyboardInput;
