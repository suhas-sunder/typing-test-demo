// Updates character input validity and is managed in test/lessons menu or page
export default function ValidateChars({ setCharIsValid, cursorIndex, newValue }) {
  setCharIsValid((prevState) =>
    prevState.map((charStatus, index) =>
      index === cursorIndex ? newValue : charStatus,
    ),
  );
}

