interface PropTypes {
  word: string;
  lengthToCapatilize: number;
}

// Returns capital case or mixed case string
function CapitalizeOddChars({ word, lengthToCapatilize }: PropTypes) {
  const charArr = word.split("");

  return charArr
    .map((char, index) =>
      index % 2 === 0 && index <= lengthToCapatilize ? char.toUpperCase() : char
    )
    .join("");
}

export default CapitalizeOddChars;
