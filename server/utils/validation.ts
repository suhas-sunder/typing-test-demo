// Sanitize and validate inputs
function validation() {
  //validation
  const sanitize = (input: any): any => {
    if (typeof input === "string") {
      return input.replace(/[<>]/g, ""); // Basic sanitization removing angle brackets
    }
    return input;
  };

  const validateString = (value: any, name: string): void => {
    if (!value || typeof value !== "string") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateNumber = (value: any, name: string): void => {
    if (value === null || value === undefined || typeof value !== "number") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateDate = (value: any, name: string): Date => {
    const date = new Date(value);
    if (!date.getTime() || isNaN(date.getTime())) {
      throw new Error(`${name} is invalid!`);
    }
    return date;
  };
  const validateArray = (input: any, fieldName: string) => {
    if (!Array.isArray(input)) {
      throw new Error(`Invalid ${fieldName} field! It must be an array.`);
    }
  };

  const validateObject = (input: any, fieldName: string) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      throw new Error(`Invalid ${fieldName} field! It must be an object.`);
    }
  };

  const validateBoolean = (input: any, fieldName: string) => {
    if (typeof input !== "boolean" && input !== null) {
      throw new Error(`Invalid ${fieldName} field! It must be a boolean.`);
    }
  };

  return {
    sanitize,
    validateString,
    validateNumber,
    validateDate,
    validateObject,
    validateBoolean,
    validateArray,
  };
}

export default validation;
