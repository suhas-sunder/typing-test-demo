import { useEffect, useState } from "react";

function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyPressed === "" && setKeyPressed(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setTimeout(() => {
        e.key === keyPressed && setKeyPressed("");
      }, 100);
    };

    addEventListener("keyup", handleKeyUp);
    addEventListener("keydown", handleKeyDown);

    return () => {
      removeEventListener("keyup", handleKeyUp);
      removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressed]);

  return { keyPressed };
}

export default useKeyPress;
