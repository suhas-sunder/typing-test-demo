interface DataType {
  totalTypingTimeSec: number;
  totalScore: number;
  totalDaysActive: number;
  totalChars: number;
}

interface PropType {
  data: DataType;
}

function FormatFetchedStats({ data }: PropType) {
  const wordsTyped = Math.ceil(data.totalChars / 5);

  const totalTypingMins = Math.floor(
    data.totalTypingTimeSec ? (data.totalTypingTimeSec / 60) % 60 : 0,
  );

  const avgWPM = totalTypingMins
    ? Math.ceil(wordsTyped / totalTypingMins)
    : wordsTyped;

  const totalTypingDays = Math.abs(
    Math.floor(
      data.totalTypingTimeSec
        ? (data.totalTypingTimeSec / (60 * 60 * 24)) % 60
        : 0,
    ),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const totalTypingHours = Math.abs(
    Math.floor(
      data.totalTypingTimeSec ? (data.totalTypingTimeSec / (60 * 60)) % 24 : 0,
    ),
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const totalScore = Math.abs(data.totalScore)?.toLocaleString("en"); //Format total score before saving

  return {
    avgWpm: avgWPM.toLocaleString("en"),
    totalKeysPressed: data?.totalChars?.toLocaleString("en") || "0",
    totalScore,
    totalDaysActive: data?.totalDaysActive?.toLocaleString("en") || "0",
    wordsTyped: wordsTyped?.toLocaleString("en") || "0",
    totalTypingDays,
    totalTypingHours,
    totalTypingMins: totalTypingMins.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
  };
}

export default FormatFetchedStats;
