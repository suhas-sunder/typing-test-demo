interface PropType {
  numWeeksBeforeToday: number;
}

export default function CalculateStartEndDates({
  numWeeksBeforeToday,
}: PropType) {
  const daysInAWeek = 7;
  const oneDayInSeconds = 86400000;

  const generatedStartDate = new Date(
    new Date().valueOf() - oneDayInSeconds * numWeeksBeforeToday * daysInAWeek,
  ); //Todays Date

  const generatedEndDate = new Date(
    new Date().valueOf() -
      oneDayInSeconds * (numWeeksBeforeToday * daysInAWeek + daysInAWeek),
  ); //One week ago

  return { generatedStartDate, generatedEndDate };
}
