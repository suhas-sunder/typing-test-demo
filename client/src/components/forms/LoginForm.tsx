//LoginForm.tsx

import { Link } from "react-router-dom";
import type { AuthFormData } from "../../pages/Login";
import { useState } from "react";
import styles from "./styles/LoginFormInputs.module.css";

interface PropTypes {
  formData: AuthFormData;
  inputValues: { [key: string]: string };
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValues: (value: { [key: string]: string }) => void;
  setGuestLogin?: (value: boolean) => void;
  serverError: string;
}

type FormInputProps = {
  inputData: { [key: string]: string | boolean | null };
  inputValues: { [key: string]: string };
  setInputValues: (value: { [key: string]: string }) => void;
};

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    focused?: string; //Allows for custom HTML attribute type called focused
  }
}
// Used by LoginForm.tsx component
function LoginFormInputs({
  inputData,
  inputValues,
  setInputValues,
}: FormInputProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const { pattern, asterisk: dispAsterisk, ...inputs } = inputData;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <label
        htmlFor={inputData.id?.toString()}
        className="relative mr-auto cursor-pointer pl-1 hover:border-0"
      >
        {dispAsterisk ? `${inputData.label} *` : inputData.label}
      </label>
      <input
        {...inputs}
        pattern={
          inputData.name?.toString().startsWith("confirm")
            ? inputValues.password
            : inputData.name?.toString().startsWith("email")
              ? undefined
              : pattern?.toString()
        }
        className="relative mb-4 rounded-md border-2 border-solid p-2 pl-4"
        onChange={handleChange}
        onBlur={() => setFocused(true)}
        onFocus={() => setFocused(false)}
        focused={focused.toString()}
      />
      <span
        className={`${styles.error} relative hidden items-center justify-center text-center text-sm`}
      >
        {inputData.err}
      </span>
    </>
  );
}

// Used by Login.tsx and Register.tsx components
function LoginForm({
  formData,
  inputValues,
  submitForm,
  setInputValues,
  setGuestLogin,
  serverError,
}: PropTypes) {
  return (
    <form
      onSubmit={submitForm}
      className="relative mx-5 flex w-full flex-col gap-4 font-nunito text-xl text-slate-600"
    >
      {formData.map((data) => (
        <LoginFormInputs
          key={data.id.toString()}
          inputData={data}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      ))}
      {location.pathname.includes("register") && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <input type="checkbox" name="privacy-tos" />{" "}
          <label className="text-base">
            I have read and agree to FreeTypingCamp's{" "}
            <span>
              {" "}
              <Link
                className="text-sky-600 hover:text-sky-500"
                to="/termsofservice"
              >
                terms of use
              </Link>
            </span>{" "}
            and{" "}
            <span>
              <Link
                className="text-sky-600 hover:text-sky-500"
                to="/privacypolicy"
              >
                privacy policy
              </Link>
            </span>
          </label>
        </div>
      )}
      {serverError && (
        <span className="mt-2  flex w-full items-center justify-center text-center text-base leading-loose text-[#d43333]">
          {serverError}
        </span>
      )}
      {location.pathname.includes("login") && (
        <div className="flex w-full justify-between text-sm sm:text-base md:gap-14">
          <button
            type="button"
            className="text-sky-600 underline underline-offset-2  hover:text-sky-500"
            onClick={() => (setGuestLogin ? setGuestLogin(true) : {})}
          >
            Login as a guest
          </button>
          <Link
            to="/forgot-password"
            className="cursor-pointer text-sky-600 underline underline-offset-2  hover:text-sky-500"
          >
            Forgot your password?
          </Link>
        </div>
      )}
      <button
        type="submit"
        className="text-md mt-4 flex w-full items-center justify-center rounded-lg border-2 bg-sky-700 py-4 text-white outline-green-900 hover:scale-[1.01] hover:brightness-105"
      >
        {location.pathname.includes("login") ? "Login" : "Sign Up"}
      </button>

      <div className="relative mt-3 flex justify-center text-center text-base sm:text-lg ">
        {location.pathname.includes("login") ? (
          <div className="flex flex-col gap-5">
            <Link to="/register">
              Don't have an account?{" "}
              <span className="text-sky-600 underline underline-offset-2 hover:text-sky-500">
                Sign up now!
              </span>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            Already have an account?{" "}
            <span className="text-sky-600 underline underline-offset-2 hover:text-sky-500">
              Login here!
            </span>
          </Link>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
