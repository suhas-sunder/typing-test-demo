import { useEffect } from "react";

//Prevents default input behaviour
function usePreventDefaultInputs() {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
}

export default usePreventDefaultInputs;
