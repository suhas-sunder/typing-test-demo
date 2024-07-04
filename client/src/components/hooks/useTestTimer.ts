import { useEffect } from "react";
import FormatTime from "../../utils/formatters/FormatTime";

function useTestTimer({
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
  correct,
  mistakes,
}) {
  useEffect(() => {
    const handleSetTimer = (sec: number) => {
      const { minutes: minCount, seconds: secCount } = FormatTime(
        typeof countdownTime === "number"
          ? Math.floor(countdownTime - sec)
          : sec,
      );

      setDisplayTimer({ min: minCount, sec: secCount, start: true });
    };

    if (startTimer) {
      // Update seconds
      const interval = setInterval(() => {
        if (
          displayTimer.min === "00" &&
          displayTimer.sec === "00" &&
          displayTimer.start
        ) {
          endTest(); //End test if countDown timer hits 0
        } else {
          setSeconds((seconds) => seconds + 1);
          handleSetTimer(seconds + 1); //Update clock countdown for display
        }
      }, 1000);

      // Cleanup timeout
      return () => {
        clearInterval(interval);
      };
    } else {
      const { minutes: minCount, seconds: secCount } = FormatTime(
        typeof countdownTime === "number" ? Math.floor(countdownTime - 0) : 0,
      );

      //Reset stats when the test is restarted or reset
      displayTimer.start &&
        setDisplayTimer({
          min: minCount,
          sec: secCount,
          start: false,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startTimer,
    endTest,
    countdownTime,
    setShowGameOverMenu,
    seconds,
    showGameOverMenu,
    displayTimer,
  ]);

  //End test if all characters have been typed
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (correct + mistakes >= testLength) endTest();
    }, 100); //Add delay so that when game is restarted, it isn't immediately ended before stats are reset

    return () => clearTimeout(timeout);
  }, [correct, endTest, mistakes, showGameOverMenu, testLength]);
}

export default useTestTimer;
