import ServerAPI from "../../api/userAPI";

interface PropType {
  emailToken: string;
  setDisplayError: (value: string) => void;
  setIsVerified: (value: boolean) => void;
  setAccountDetails: (value: { username: string; email: string }) => void;
}

//Verifies user email for signup
export default async function PostVerifyEmail({
  emailToken,
  setDisplayError,
  setIsVerified,
  setAccountDetails,
}: PropType) {
  try {
    const data = {
      emailToken,
    };

    const response = await ServerAPI.post("/verify-email", {
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
      setIsVerified(true);
      setAccountDetails({
        username: parseRes.user_name,
        email: parseRes.user_email,
      });
      return parseRes;
    } else {
      setDisplayError("Uh oh! Email verification failed!");
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
