//Register

import { useLayoutEffect, useState } from "react";
import ServerAPI from "../api/userAPI";

import loadable from "@loadable/component";
import PasswordValidation from "../utils/validation/PasswordValidation";
import type { AuthFormData } from "./Login";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import SendEmailVerification from "../components/forms/SendEmailVerification";

const LoginForm = loadable(() => import("../components/forms/LoginForm"));

function Register() {
  const [verifyEmailMsg, setVerifyEmailMsg] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerData: AuthFormData = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^.{6,16}$",
      err: "Username must be between 6 and 16 characters!",
      required: true,
      asterisk: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      // eslint-disable-next-line no-useless-escape
      pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
      err: "Please enter a valid email!",
      required: true,
      asterisk: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      asterisk: true,
    },
    {
      id: "confirm-password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      pattern: "",
      err: "Password does not match!",
      required: true,
      asterisk: true,
    },
  ];
  //profanity matcher to check for profane usernames
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const [serverError, setServerError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const privacyTos = formData.get("privacy-tos");

    if (!privacyTos) {
      setServerError(
        `Users must read and accept terms and conditions before creating an account!`,
      );
      return;
    }

    if (matcher.hasMatch(inputValues.username)) {
      setServerError(
        `Sorry, your account was not created. The system has detected profanity in your username "${inputValues.username}" which is against FreeCodeCamp's username policy. Contact us at admin@freecodecamp.com if this is a mistake.`,
      );
      return;
    }

    const passwordValidationErr = PasswordValidation({
      password: inputValues.password,
    });

    //Display validation error and skip submission
    if (passwordValidationErr) {
      setServerError(passwordValidationErr);
      return;
    }

    try {
      const data = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      };

      const response = await ServerAPI.post("/register", {
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

          message.includes("Network") &&
            setServerError(
              "500 Internal Server Error. Please try again later!",
            );

          message.includes("401") &&
            setServerError("An account with this email already exists!");

          console.log(message);
        });

      const parseRes = await response;

      if (parseRes) {
        setVerifyEmailMsg(true);
      } else {
        console.log("Error creating creating user account");
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

  useLayoutEffect(() => {
    LoginForm.load();
  }, []);

  return (
    <div className="relative mt-12 flex flex-col items-center gap-12 px-5">
      <header>
        <h1 className="text-center font-nunito text-3xl text-defaultblue md:text-4xl">
          {verifyEmailMsg ? (
            <span>Email Verification Required!</span>
          ) : (
            <span>Create a free account</span>
          )}
        </h1>
      </header>
      <main className="flex">
        {verifyEmailMsg ? (
          <SendEmailVerification
            email={inputValues.email}
            username={inputValues.username}
            isLogin={false}
            setVerifyEmailMsg={setVerifyEmailMsg}
          />
        ) : (
          <LoginForm
            formData={registerData}
            submitForm={handleSubmit}
            inputValues={inputValues}
            setInputValues={setInputValues}
            serverError={serverError}
          />
        )}
      </main>
    </div>
  );
}

export default Register;
