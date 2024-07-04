import { AxiosError } from "axios";
import ServerAPI from "../../api/userAPI";

interface PropType {
  resetToken: string;
  setError: (value: string) => void;
  setResetPassword: (value: boolean) => void;
  setResetPasswordEmail: (value: string) => void;
}
//Verifies user email for signup
export default async function PostVerifyForgotPwdToken({
  resetToken,
  setError,
  setResetPassword,
  setResetPasswordEmail,
}: PropType) {
  try {
    const data = {
      resetToken,
    };

    const response = await ServerAPI.post("/verify-pwd-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        let message;

        if (err instanceof AxiosError) {
          message = err.message;

          err?.response?.data && setError(err?.response?.data.error);
        } else {
          message = String(err);
        }

        console.log(message);
      });

    const parseRes = await response;

    if (parseRes) {
      if (parseRes.user_email) {
        setResetPasswordEmail(parseRes.user_email);
        setResetPassword(true);
        return parseRes;
      } else {
        setError("Password reset link is invalid");
        return null;
      }
    }
  } catch (err) {
    let message;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
    return null;
  }
}
