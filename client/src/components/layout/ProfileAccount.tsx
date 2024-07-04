//ProfileAccount.tsx

import { Fragment, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useImg from "../hooks/useImg";
import useLoadAnimation from "../hooks/useLoadAnimation";
import PasswordValidation from "../../utils/validation/PasswordValidation";
import styles from "./styles/ProfileAccount.module.css";
import ServerAPI from "../../api/userAPI";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

export default function ProfileAccount() {
  const { userName, email, userId, setUserName, setEmail } = useAuth();
  const { imageData } = useImg();
  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    emailOrUsername: "",
    password: "",
  });

  //profanity matcher to check for profane usernames
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const inputs = [
    {
      id: "username",
      name: "username",
      type: "text",
      text: "Username",
      placeholder: userName,
      label: "Username",
      pattern: "^.{6,16}$",
      err: "Username must be between 6 and 16 characters!",
      required: false,
      asterisk: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      text: "Email",
      placeholder: email,
      label: "Email",
      // eslint-disable-next-line no-useless-escape
      pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
      err: "Please enter a valid email!",
      required: false,
      asterisk: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      text: "Password",
      placeholder: "********",
      label: "Password",
      required: false,
      asterisk: true,
    },
  ];

  const { fadeAnim } = useLoadAnimation();

  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();

    //Skip password validation if new password is not entered
    const err =
      inputValues.password === ""
        ? ""
        : PasswordValidation({ password: inputValues.password });

    console.log(inputValues);

    if (matcher.hasMatch(inputValues.username)) {
      setServerError(
        `Sorry, your account was not created. The system has detected profanity in your username "${inputValues.username}" which is against FreeCodeCamp's username policy. Contact us at admin@freecodecamp.com if this is a mistake.`,
      );
      return;
    }

    //Display validation error and skip submission
    if (err) {
      setServerError(err);
      return;
    }

    if (email === "guests@imaginaryemail.com") {
      setServerError("Sorry, guest account details cannot be edited!");
      return;
    }

    try {
      const data = {
        userId,
        firstName: inputValues?.firstName || "",
        lastName: inputValues?.lastName || "",
        username: inputValues?.username || "",
        email: inputValues?.email || "",
        password: inputValues?.password || "",
      };

      const response = await ServerAPI.post("/account-update", {
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

          message.includes("500") &&
            setServerError(
              "500 Internal Server Error. Please try again later!",
            );

          message.includes("401") &&
            setServerError("An account with this email already exists!");

          console.log(message);
        });

      const parseRes = await response;

      if (parseRes) {
        if (parseRes.username) setUserName(parseRes.username);
        if (parseRes.email) setEmail(parseRes.email);
        if (parseRes.jwt_token) {
          localStorage.removeItem("jwt_token"); //remove existing jwt token
          localStorage.setItem("jwt_token", parseRes.jwt_token); //Save new jwt token

          setIsAuthenticated(true);
        }
        window.location.reload();
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useLayoutEffect(() => {
    const savedImgURL = imageData.profile_pathname;
    if (savedImgURL && profileImgURL !== savedImgURL) {
      setProfileImgURL(
        `https://www.honeycombartist.com${imageData.profile_pathname}`,
      );
    } else {
      setProfileImgURL(
        "https://www.honeycombartist.com/origami-style%2Fkitten%2Fkitten",
      );
    }
  }, [imageData, profileImgURL]);

  return (
    <>
      <div
        className={`${fadeAnim} flex flex-col items-center gap-8 pb-6 transition-opacity duration-700 ease-in`}
      >
        <Link to="/profile/img">
          <picture className="flex min-h-[176px] min-w-[176px]">
            <source srcSet={`${profileImgURL}.webp`} type="image/webp"></source>
            <img
              src={`${profileImgURL}.png`}
              alt="Colourful wolf standing on a mountain top."
              className={`relative flex h-44 w-44 rounded-2xl border-defaultblue bg-defaultblue object-cover`}
              width={176}
              height={176}
            />
          </picture>
        </Link>
        <h2 className="min-h-10 text-center text-3xl text-sky-700  sm:text-4xl">
          {userName}
        </h2>
      </div>
      <form
        id="profile-img"
        onSubmit={handleSubmit}
        className={`${fadeAnim} flex w-full  flex-col items-center justify-center gap-16 text-defaultblue`}
      >
        {inputs.map((input) => (
          <Fragment key={input.id}>
            <div
              key={input.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <label
                htmlFor={input.id}
                className="flex min-w-[5em] sm:justify-end"
              >
                {input.text}
                <span className="hidden sm:flex">:</span>{" "}
              </label>
              <input
                id={input.id}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                className="min-w-[5em] rounded-md border-2 px-2 py-1"
                pattern={
                  input.name?.toString().startsWith("confirm")
                    ? inputValues.password
                    : input.name?.toString().startsWith("email")
                      ? undefined
                      : input.pattern?.toString()
                }
                onChange={handleChange}
                onBlur={() => setFocused(true)}
                onFocus={() => setFocused(false)}
                focused={focused.toString()}
              />
            </div>
            <span
              className={`${styles.error} relative hidden items-center justify-center text-center text-sm`}
            >
              input.err
            </span>
          </Fragment>
        ))}
        {serverError && (
          <span
            className={`${styles.error} relative items-center justify-center text-center text-sm`}
          >
            {serverError}
          </span>
        )}
        <button className="bg-b rounded-lg border-2 border-sky-700 bg-sky-700 px-6 py-3 text-sm tracking-widest text-white hover:border-sky-400 hover:bg-white hover:text-sky-700">
          Submit Changes
        </button>
      </form>
      {/* <button className="rounded-lg border-2 px-4 py-2 text-xs tracking-widest text-red-600 hover:border-red-300">
        Delete Account
      </button> */}
    </>
  );
}
