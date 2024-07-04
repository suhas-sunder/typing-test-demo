import { Request, Response } from "express";
module.exports = function (
  req: Request,
  res: Response,
  next: CallableFunction
) {
  const { username, email, password } = req.body.data;

  function validateUsername() {
    return /^.{6,16}$/.test(username);
  }

  function validatePassword() {
    let lowerCase = false;
    let upperCase = false;
    let specialCase = false;
    let numbers = false;

    password.split("").forEach((char: string) => {
      if (password.length < 8) return false;
      if (/^\d+$/.test(char)) {
        numbers = true;
      } else if (/.*[a-z].*/.test(char)) {
        lowerCase = true;
      } else if (/.*[A-Z].*/.test(char)) {
        upperCase = true;
      } else {
        specialCase = true;
      }
    });

    return !lowerCase || !upperCase || !specialCase || !numbers ? false : true;
  }

  if (req.path === "/register") {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validateUsername()) {
      return res.status(401).json("Invalid Username!");
    } else if (!validatePassword()) {
      return res.status(401).json("Invalid Password!");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing credentials!");
    } else if (!validatePassword()) {
      return res.status(401).json("Invalid Password!");
    }
  }

  next();
};
