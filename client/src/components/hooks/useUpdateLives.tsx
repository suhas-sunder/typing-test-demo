import { useEffect } from "react";

function useUpdateLives({ lives, setSeconds, showGameOverMenu, setShowGameOverMenu }) {
  useEffect(() => {
    const livesRemaining = lives.filter((life) => life === "full").length;
    let interval;

    const incrementTimer = () => {
      setSeconds((prevState: number) => prevState + 1);
    };

    //Start/end timer
    if (!showGameOverMenu && livesRemaining > 0) {
      interval = setInterval(() => incrementTimer(), 1000);
    }

    //End game if lives are over
    if (livesRemaining <= 0 && !showGameOverMenu) {
      setShowGameOverMenu((prevState) => !prevState); //Ends the game
    }

    return () => {
      clearInterval(interval);
    };
  }, [showGameOverMenu, lives, setShowGameOverMenu, setSeconds]);
}

export default useUpdateLives;
