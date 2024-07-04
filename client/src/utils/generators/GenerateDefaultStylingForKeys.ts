interface PropType {
  keyArr: { [key: string]: string }[] | string[];
  styling: string;
}

//Takes an array, and returns an object with default styling applied, used for keyboard/keypad styling
export default function GenerateDefaultStylingForKeys({
  keyArr,
  styling,
}: PropType) {
  const keyStyles = {};

  keyArr.forEach((key) => (keyStyles[`${key}`] = styling));

  return keyStyles;
}
