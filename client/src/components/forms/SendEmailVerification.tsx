import { useCallback, useEffect, useState } from "react";
import PostSendVerifyEmail from "../../utils/requests/PostSendVerifyEmail";
import { Link, useNavigate } from "react-router-dom";
import useResendDelay from "../hooks/useResendDelay";

interface PropType {
  username: string;
  email: string;
  isLogin: boolean;
  setVerifyEmailMsg: (value: boolean) => void;
}
export default function SendEmailVerification({
  username,
  email,
  isLogin,
  setVerifyEmailMsg,
}: PropType) {
  const [displayError, setDisplayError] = useState<string>("");
  const [verificationSent, setVerificationSent] = useState<string>("");
  const navigate = useNavigate();

  const {
    seconds,
    setSentEmailCount,
    allowResend,
    setAllowResend,
    setSeconds,
    sentEmailCount,
  } = useResendDelay();

  const handleVerification = useCallback(async () => {
    await PostSendVerifyEmail({
      username,
      email,
      setDisplayError,
      setVerificationSent,
      setSentEmailCount,
    });
  }, [username, email, setSentEmailCount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSeconds(60 * sentEmailCount);
    setAllowResend(false);
    handleVerification();
  };

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  return (
    <form
      className="flex max-w-[800px] flex-col items-center justify-center gap-8 text-center font-lato text-xl leading-loose tracking-widest text-slate-950"
      onSubmit={handleSubmit}
    >
      {isLogin ? (
        <p className="text-defaultblue">
          Our records indicate that you have not yet activated your account. A
          new verification link has just been sent.
        </p>
      ) : (
        <p>
          Dear {username}, congratulations on registering with us using {email}.
          You are one step away from accessing your account! Please check your
          email for a verification link.
        </p>
      )}
      {/* Add a 60 second timer to this which goes up to 5 mins after each attempt. This logic will be reused when user attempts to login using email and password but is not yet verified.*/}
      {!verificationSent && (
        <p className="flex flex-col gap-4">
          <span>{verificationSent}</span>{" "}
          <span>
            Once you have verified you can{" "}
            <button
              type="button"
              onClick={() =>
                isLogin ? setVerifyEmailMsg(false) : navigate("/login")
              }
              className="text-sky-600 hover:text-sky-500"
            >
              try logging in here!
            </button>
          </span>
        </p>
      )}
      {displayError && (
        <div className="font-nunito text-red-600">*{displayError}</div>
      )}
      {allowResend ? (
        <button
          disabled={!allowResend}
          type="submit"
          className="flex rounded-lg bg-sky-600 px-6 py-4 font-nunito text-base text-white hover:scale-105 "
        >
          Resend Verification Email
        </button>
      ) : (
        <p className="font-nunito">
          Please wait {seconds} seconds before sending another verification
          email.
        </p>
      )}
      <p className="mt-1 text-base leading-loose">
        If you didn't receive a verification email please check your spam and
        junk folders or try waiting a few minutes.{" "}
      </p>
      <p className="mt-1 text-base">
        Feel free to contact us at{" "}
        <span className="text-sky-600 hover:text-sky-500">
          <Link to="mailto:admin@freetypingcamp.com">
            admin@freetypingcamp.com
          </Link>{" "}
        </span>
        if you are facing issues.
      </p>
    </form>
  );
}
