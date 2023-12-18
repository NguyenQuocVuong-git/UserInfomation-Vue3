export const BACKEND_SERVER =
  process.env.VUE_APP_BACKEND_SERVER || "http://localhost:3000";

export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FORMAT_PASSWORD =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
export const FORMAT_USERNAME = /^[a-z][a-z0-9]{7,16}$/;
export const FORMAT_USERNAME_START = /^(?!.*(\w)\1{3,}).+$/;
export const FORMAT_NAME = /[a-zA-Z ]{1,30}$/;
export const FORMAT_NUMBER = /[0-9]{1,4}$/;
export const FORMAT_PHONE = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
