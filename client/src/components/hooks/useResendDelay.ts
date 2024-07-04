import { useEffect, useState } from "react";

function useResendDelay() {
  const [sentEmailCount, setSentEmailCount] = useState<number>(1); //Keeps track of emails sent so a delay timer can be added accordingly
  const [allowResend, setAllowResend] = useState<boolean>(false); //Determines if users can send another verification email
  const [seconds, setSeconds] = useState<number>(60); //Time left before another notification can be sent

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setAllowResend(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [allowResend, seconds, sentEmailCount]);

  return {
    seconds,
    setSentEmailCount,
    allowResend,
    setAllowResend,
    setSeconds,
    sentEmailCount,
  };
}

export default useResendDelay;
