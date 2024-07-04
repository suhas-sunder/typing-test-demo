import { useEffect } from "react";

interface PropType {
  firstInputDetected?: boolean;
  seconds: number;
  setSeconds: (value: number) => void;
  charIsValid?: string[];
  setTestStats: (
    value: (prevState: { [key: string]: number }) => { [key: string]: number },
  ) => void;
  accurateKeys: { [key: string]: number };
  troubledKeys: { [key: string]: number };
}

//Calculate typing stats. Used by typingstats.tsx, games, and lessons.
function useTestStats({
  firstInputDetected,
  seconds,
  setTestStats,
  setSeconds,
  charIsValid,
  accurateKeys,
  troubledKeys,
}: PropType) {
  useEffect(() => {
    //charIsValid is used to calculate values when backspace is allowed to delete mistakes, otherwise troubled keys is used since charIsValid doesn't exist for some parent components like ones that handle games
    const charMistakes = charIsValid
      ? charIsValid.filter((validChar) => validChar.toLowerCase() === "error")
          .length
      : Object.values(troubledKeys).reduce((a, b) => a + b, 0) || 0;
    const charCorrect = charIsValid
      ? charIsValid.filter((validChar) => validChar.toLowerCase() === "correct")
          .length
      : Object.values(accurateKeys).reduce((a, b) => a + b, 0) || 0;

    const totalCharsTyped = charCorrect + charMistakes;
    const avgCharsPerWord = 5.0;
    const timeElapsedMin = (seconds || 1) / 60;
    const netWPM = Math.ceil(charCorrect / avgCharsPerWord / timeElapsedMin);
    const netCPM = Math.ceil(charCorrect / timeElapsedMin);
    const accuracy =
      Math.floor((charCorrect / (charCorrect + charMistakes)) * 100) || 0;

    if (totalCharsTyped === 0 && !firstInputDetected) setSeconds(0); //Reset timer when test resets. Only applicable for speed test where timer is displayed.
    const finalWPM = accuracy > 0 ? Math.round(netWPM * (accuracy / 100)) : 0;
    const finalCPM = accuracy > 0 ? Math.round(netCPM * (accuracy / 100)) : 0;

    setTestStats((prevState) => ({
      ...prevState,
      correct: charCorrect,
      mistakes: charMistakes,
      wpm: netWPM,
      cpm: netCPM,
      accuracy,
      finalWPM,
      finalCPM,
    }));
  }, [
    firstInputDetected,
    seconds,
    accurateKeys,
    troubledKeys,
    setSeconds,
    setTestStats,
    charIsValid,
  ]);
}

export default useTestStats;
