import { AxiosError } from "axios";
import ServerAPI from "../../api/userAPI";


interface PropType {
  email: string;
  setError: (value: string) => void;
  setSentEmailCount: (value: (prevState: number) => number) => void;
}

//Sends a verification email to users that signup
export default async function PostSendPwdResetEmail({
  email,
  setError,
  setSentEmailCount,
}: PropType) {
  try {
    const data = {
      email,
    };

    const response = await ServerAPI.post("/send-pwd-reset-email", {
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

          err?.response?.data && setError(err?.response?.data);
        } else {
          message = String(err);
        }

        console.log(message);
      });

    const parseRes = await response;

    if (parseRes) {
      setSentEmailCount((prevState) => prevState + 1);
    }
  } catch (err) {
    let message;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }
}
