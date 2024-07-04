import { useEffect } from "react";

interface PropType {
  lockScreen: boolean;
}

//Prevents scroll when modal is active
function useLockScreenForModal({ lockScreen }: PropType) {
  useEffect(() => {
    const bodyElement = document.getElementsByTagName("body")[0];

    if (lockScreen) {
      if (bodyElement) bodyElement.style.overflow = "hidden"; //Prevents background from scrolling
    } else {
      if (bodyElement) bodyElement.style.overflow = "auto"; //Reset scroll on body
    }
  }, [lockScreen]);
}

export default useLockScreenForModal;
