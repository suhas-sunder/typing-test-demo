import ServerAPI from "../../api/userAPI";

interface PropType {
  email: string;
  username: string;
  setDisplayError: (value: string) => void;
  setVerificationSent: (value: string) => void;
  setSentEmailCount: (value: (prevState: number) => number) => void;
}

//Sends a verification email to users that signup
export default async function PostSendVerifyEmail({
  email,
  username,
  setDisplayError,
  setVerificationSent,
  setSentEmailCount,
}: PropType) {
  try {
    const data = {
      username,
      email,
    };

    const response = await ServerAPI.post("/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        let message;

        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }

        console.log(message);
        setDisplayError(message);
      });

    const parseRes = await response;

    if (parseRes) {
      setVerificationSent(
        `Verification email has just been sent! ${new Date().toLocaleString()}`,
      );
      setSentEmailCount((prevState) => prevState + 1);
      return parseRes.data;
    } else {
      setDisplayError(
        "Error! Failed to send verification email to user. Please try again later!",
      );
      setSentEmailCount((prevState) => prevState + 1);
      console.log("Error creating creating user account");
      return null;
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
