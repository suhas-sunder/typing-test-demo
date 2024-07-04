import { useState } from "react";

interface PropType {
  countdownTime?: number;
}

//Common dependencies used to track stats
function useTrackStats({ countdownTime }: PropType) {
  const [seconds, setSeconds] = useState<number>(0);
  const [testStats, setTestStats] = useState<{ [key: string]: number }>({
    correct: 0,
    mistakes: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    minutesLeft: 0,
    secondsLeft: 0,
  });
  const maxLives = 6;

  const [displayTimer, setDisplayTimer] = useState<{
    [key: string]: string | boolean;
  }>({
    min:
      typeof countdownTime === "number"
        ? Math.ceil(countdownTime / 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        : "00",
    sec: "00 ",
    start: false,
  });

  //List of all acceptable input keys for this game
  const validNumpadChars = [
    "placeholder",
    "/",
    "*",
    "-",
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "↵",
    "0",
    ".",
  ];

  return {
    testStats,
    setTestStats,
    seconds,
    setSeconds,
    displayTimer,
    setDisplayTimer,
    maxLives,
    validNumpadChars,
  };
}

export default useTrackStats;
