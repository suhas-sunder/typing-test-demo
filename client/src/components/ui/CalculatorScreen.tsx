import styles from "../../components/layout/styles/TextBox.module.css";
import { v4 as uuidv4 } from "uuid";
function CalculatorScreen({ calculations, cursorPosition, inputValidity }) {
  return (
    <div className="flex h-24 w-full items-center justify-end gap-[2.5px] rounded-lg border-[3px] px-3 font-mono text-xl leading-10 tracking-tight sm:flex sm:min-w-[12.45em] sm:text-3xl">
      {calculations.map((char, index) => {
        if (index === cursorPosition) {
          return (
            <span
              key={uuidv4()}
              className={`${styles.cursor} flex w-full items-center justify-center border-b-2 border-current py-2 text-sky-700 `}
            >
              {char}
            </span>
          );
        } else {
          return (
            <span
              key={uuidv4()}
              className={`${
                inputValidity[index] === "invalid"
                  ? "rounded-md bg-red-400 text-white"
                  : "text-black"
              }  ${
                inputValidity[index] === "valid"
                  ? "rounded-md bg-sky-400 text-white"
                  : "text-black"
              } border-b-grey-100 flex w-full items-center justify-center border-b-2 py-2`}
            >
              {char}
            </span>
          );
        }
      })}
    </div>
  );
}

export default CalculatorScreen;
