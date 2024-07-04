import { useState, useEffect } from "react";
import ServerAPI from "../api/userAPI";
import loadable from "@loadable/component";
import PasswordValidation from "../utils/validation/PasswordValidation";
import useAuth from "../components/hooks/useAuth";
import SendEmailVerification from "../components/forms/SendEmailVerification";

const LoginForm = loadable(() => import("../components/forms/LoginForm"));

export type AuthFormData = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  err?: string;
  pattern?: string;
  required: boolean;
  asterisk: boolean;
}[];

function Login() {
  const [verifyEmailMsg, setVerifyEmailMsg] = useState<boolean>(false);
  const { setIsAuthenticated } = useAuth();
  const [guestLogin, setGuestLogin] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });

  const loginData: AuthFormData = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      err: "Please enter a valid email!",
      required: true,
      asterisk: false,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      asterisk: false,
    },
  ];

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();

    const err = PasswordValidation({ password: inputValues.password });

    //Display validation error and skip submission
    if (err && !guestLogin) {
      setServerError(err);
      return;
    }

    try {
      const response = await ServerAPI.post("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: guestLogin ? "guests@imaginaryemail.com" : inputValues.email,
          password: guestLogin
            ? "Randpass1@asdfwasdfwasdf"
            : inputValues.password,
        },
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

          message.includes("Network") &&
            setServerError(
              "500 Internal Server Error. Please try again later!",
            );

          message.includes("401") &&
            setServerError("Invalid email or password!");

          console.log(message);
        });

      const parseRes = await response;

      if (parseRes.jwt_token) {
        localStorage.setItem("jwt_token", parseRes.jwt_token);
        setIsAuthenticated(true);
      } else if (parseRes.user_name) {
        setVerifyEmailMsg(true);
        setInputValues((prevState) => ({
          ...prevState,
          ["username"]: parseRes.user_name,
        }));
      } else {
        console.log("Error authenticating user login");
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
  };

  useEffect(() => {
    guestLogin && handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestLogin]);

  useEffect(() => {
    LoginForm.load();
  }, []);

  return (
    <div className="relative mt-12 flex flex-col items-center gap-12 px-5">
      <header>
        <h1 className="font-nunito text-3xl text-defaultblue md:text-4xl">
          {verifyEmailMsg ? (
            <span>Email Verification Required!</span>
          ) : (
            <span>Log in</span>
          )}
        </h1>
      </header>
      <main className="flex">
        {verifyEmailMsg ? (
          <SendEmailVerification
            email={inputValues.email}
            username={inputValues.username}
            isLogin={true}
            setVerifyEmailMsg={setVerifyEmailMsg}
          />
        ) : (
          <LoginForm
            formData={loginData}
            submitForm={handleSubmit}
            inputValues={inputValues}
            setInputValues={setInputValues}
            setGuestLogin={setGuestLogin}
            serverError={serverError}
          />
        )}
      </main>{" "}
    </div>
  );
}

export default Login;
