import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultCharsObj from "../../data/DefaultCharsObj";

//Provide same state and other dependencies for reuse as a template by various typing test components
export default function useTestDependencies({ defaultText }) {
  const [charIsValid, setCharIsValid] = useState<string[]>(
    new Array(defaultText.length).fill(""),
  ); //Tracks every user input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [text, setText] = useState<string>(defaultText);

  //List of all possible character inputs to track
  const defaultCharsObj = useMemo(() => DefaultCharsObj(), []);

  const [accurateKeys, setAccurateKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });
  const [troubledKeys, setTroubledKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });

  const location = useLocation();
  const navigate = useNavigate();
  // Reset states when game is over
  const handleEndTest = useCallback(() => {
    setShowGameOverMenu(true);
    setStartTimer(false);
  }, []);

  // For clearing all data when test is restarted or ended
  const clearTestData = useCallback(() => {
    setCharIsValid(new Array(text.length).fill(""));
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setFirstInputDetected(false);
    setStartTimer(false);
    setText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  //Update text and dependency when default text changes. This is necessary because some text is fetched from an API and must be updated from the default text that is loaded
  useEffect(() => {
    const handleResetTest = () => {
      setCharIsValid(new Array(defaultText.length).fill(""));
      setAccurateKeys({ ...defaultCharsObj });
      setTroubledKeys({ ...defaultCharsObj });
      setShowGameOverMenu(false);
      setCursorPosition(0);
      setFirstInputDetected(false);
      setStartTimer(false);
      setText(defaultText);
    };

    defaultText !== text && handleResetTest(); //Only runs when new text is detected

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCharsObj, defaultText]);

  return {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    setStartTimer,
    cursorPosition,
    setCursorPosition,
    text,
    setText,
    accurateKeys,
    troubledKeys,
    location,
    navigate,
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  };
}
