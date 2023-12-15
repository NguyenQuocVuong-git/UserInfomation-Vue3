import { isEmpty, isEmptyArray, isNullOrUndefined } from "./index";
import {
  EMAIL_FORMAT,
  FORMAT_PASSWORD,
  FORMAT_USERNAME,
  FORMAT_USERNAME_START,
  FORMAT_NUMBER,
  FORMAT_NAME,
  FORMAT_PHONE,
} from "../configs/constants";
export const requiredValidator = (value) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return "This field is required";

  return !!String(value).trim().length || "This field is required";
};

export const emailValidator = (value) => {
  if (isEmpty(value)) return true;
  if (Array.isArray(value))
    return (
      value.every((val) => EMAIL_FORMAT.test(String(val))) ||
      "The Email field must be a valid email"
    );

  return (
    EMAIL_FORMAT.test(String(value)) || "The Email field must be a valid email"
  );
};

export const passwordValidator = (password) => {
  const validPassword = FORMAT_PASSWORD.test(password);

  return (
    validPassword ||
    "Field must contain at least one uppercase, lowercase, two special character and digit with min 8 chars"
  );
};

export const confirmedValidator = (value, target) =>
  value === target || "The Confirm Password field confirmation does not match";

export const usernameValidator = (value) => {
  if (isEmpty(value)) return true;
  return (
    (FORMAT_USERNAME.test(value) && FORMAT_USERNAME_START.test(value)) ||
    "Lowercase, numbers, 8->16, don't start with a number, don't repeated characters"
  );
};

export const nameValidator = (value) => {
  if (isEmpty(value)) return true;
  return FORMAT_NAME.test(value) || "Lowercase, uppercase, 1->30";
};

export const numberValidator = (value) => {
  if (isEmpty(value)) return true;
  return FORMAT_NUMBER.test(value) || "Number: [0-9]{0,2}";
};

export const phoneValidator = (value) => {
  if (isEmpty(value)) return true;
  return FORMAT_PHONE.test(value) || "Phone: 0352305412";
};
