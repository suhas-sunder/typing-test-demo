import { useEffect, useState } from "react";
import PostSendPwdResetEmail from "../utils/requests/PostSendPwdResetEmail";
import useResendDelay from "../components/hooks/useResendDelay";
import PostVerifyForgotPwdToken from "../utils/requests/PostVerifyForgotPwdToken";
import PostForgotPwdReset from "../utils/requests/PostForgotPwdReset";
import PasswordValidation from "../utils/validation/PasswordValidation";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";

function ForgotPassword() {
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>(""); //If this email does not match email entered by user when re-setting password then don't reset pwd

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    seconds,
    setSentEmailCount,
    allowResend,
    setAllowResend,
    setSeconds,
    sentEmailCount,
  } = useResendDelay();

  //If search string contains no reset token, send password reset email. If search string with reset token is valid, display reset password inputs & reset password if email matches reset token and new password is valid. Once password is reset, remove token from db.
  //If token doesn't exist on db tell user password reset failed. Reset link may be expired. Try to reset your password again or contact us at admin@freetypingcamp.com
  //If reset email doesn't exist send error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirm-password")?.toString() || "";

    if (resetPassword) {
      //Update user password if token is valid and email/new password are valid

      const validatePasswordErr = PasswordValidation({ password }); //Returns an error if password is invalid or "" if valid

      if (!email || !password || !confirmPassword) {
        setError("Please enter a valid email and password!");
        return;
      }

      if (email !== resetPasswordEmail) {
        setError(
          "The email you have entered does not match the email on record for this password reset. Please use the correct email.",
        );
        return;
      }

      if (validatePasswordErr) {
        setError(validatePasswordErr);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      await PostForgotPwdReset({ setIsReset, setError, email, password, setIsAuthenticated });
    } else {
      if (!email) {
        setError("Please enter a valid email!");
        return;
      }

      //Add delay before allowing user to send another password reset email
      setSeconds(60 * sentEmailCount);
      setAllowResend(false);

      //Send forgot password reset email to user
      await PostSendPwdResetEmail({
        email,
        setError,
        setSentEmailCount,
      });
    }
  };

  //Check if reset password token is valid if one is provided in search query
  useEffect(() => {
    if (isAuthenticated) return navigate("/profile/summary"); //We don't want users changing their password from here when they're already logged in!

    setSeconds(0);
    setAllowResend(true);
    const searchPath = location.search.split("=");
    const resetToken = searchPath[1];

    const handleVerifyToken = async () => {
      await PostVerifyForgotPwdToken({
        resetToken,
        setError,
        setResetPassword,
        setResetPasswordEmail,
      });
    };

    if (
      searchPath[0].includes("resetToken") &&
      searchPath[1] &&
      searchPath[1] !== "%22%22" //Empty string gets converted to this in search path
    )
      handleVerifyToken();
  }, [isAuthenticated, navigate, setAllowResend, setSeconds]);

  return (
    <div className="mx-auto mt-12 flex max-w-[900px] flex-col items-center gap-12 px-5 font-nunito text-xl text-slate-600">
      <header>
        {" "}
        <h1 className="text-center text-3xl text-defaultblue md:text-4xl">
          Forgot Password?
        </h1>
      </header>
      <main>
        {isReset ? (
          <p>
            Your password has been successfully reset!{" "}
            <span>
              {" "}
              <Link to="/login" className="text-sky-600 hover:text-sky-500">
                Click here to login.
              </Link>
            </span>
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-4">
                <label className="relative mr-auto  cursor-pointer pl-1 hover:border-0">
                  Email *
                </label>
                <input
                  disabled={!allowResend}
                  className="relative mb-4 rounded-md border-2 border-solid p-2 pl-4"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                />
              </li>
              {resetPassword && (
                <>
                  <li className="flex flex-col gap-4">
                    <label className="relative mr-auto  cursor-pointer pl-1 hover:border-0">
                      New Password *
                    </label>
                    <input
                      className="relative mb-4 rounded-md border-2 border-solid p-2 pl-4"
                      name="password"
                      type="password"
                      required={resetPassword}
                      placeholder="Password"
                    />
                  </li>
                  <li className="flex flex-col gap-4">
                    <label className="relative mr-auto  cursor-pointer pl-1 hover:border-0">
                      Confirm New Password *
                    </label>
                    <input
                      className="relative mb-4 rounded-md border-2 border-solid p-2 pl-4"
                      name="confirm-password"
                      type="password"
                      required={resetPassword}
                      placeholder="Confirm Password"
                    />
                  </li>
                </>
              )}
            </ul>
            {error && (
              <p className="mb-6 mt-3 flex w-full items-center justify-center text-center text-base text-red-600">
                {error.toString()}
              </p>
            )}

            {resetPassword ? (
              <button
                disabled={!allowResend}
                type="submit"
                className="text-md mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-sky-700 py-4 text-white outline-green-900 hover:scale-[1.01] hover:brightness-105"
              >
                "Reset Password"
              </button>
            ) : (
              <>
                {" "}
                {allowResend ? (
                  <button
                    disabled={!allowResend}
                    type="submit"
                    className="text-md mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-sky-700 py-4 text-white outline-green-900 hover:scale-[1.01] hover:brightness-105"
                  >
                    "Send Reset Email"
                  </button>
                ) : (
                  <p className="mt-2">
                    {" "}
                    Please wait {seconds} seconds before sending another reset
                    email.
                  </p>
                )}
              </>
            )}
            {sentEmailCount > 1 && (
              <div className="mt-8 flex flex-col items-center justify-center gap-4 text-base">
                <p>
                  {sentEmailCount > 2 ? "Another" : "A"} password reset email
                  has been sent to your email.
                </p>{" "}
                <p>If you don't see it yet please wait a few minutes.</p>
                <p>Don't forget to check your junk/spam folders!</p>
              </div>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

export default ForgotPassword;
