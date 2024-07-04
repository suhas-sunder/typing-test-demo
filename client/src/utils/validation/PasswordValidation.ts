

interface PropType {
  password: string;
}

export default function PasswordValidation({ password }: PropType) {
  if (typeof password !== "string" || password.length === 0) {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters in length!";
  }

  let lowerCase = false;
  let upperCase = false;
  let specialCase = false;
  let numbers = false;

  password.split("").forEach(char => {
    if (/^\d+$/.test(char)) {
      numbers = true;
    } else if (/.*[a-z].*/.test(char)) {
      lowerCase = true;
    } else if (/.*[A-Z].*/.test(char)) {
      upperCase = true;
    } else {
      specialCase = true;
    }
  })

  if (!lowerCase || !upperCase || !specialCase || !numbers) return "Password must have at least one of each letter: upper case, lower case, special case, and a number!"

  return "";
}
