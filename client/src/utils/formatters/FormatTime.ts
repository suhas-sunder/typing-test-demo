function FormatTime(totalTimeSec: number) {
  if (totalTimeSec < 0) console.error("Total time  should not be negative!");
  const hours = Math.abs(Math.floor(totalTimeSec / 3600)).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    },
  );

  const minutes = Math.abs(
    Math.floor((totalTimeSec % 3600) / 60),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const seconds = Math.abs(
    Math.floor((totalTimeSec % 3600) % 60),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return { hours, minutes, seconds };
}

export default FormatTime;
