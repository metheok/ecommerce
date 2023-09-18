const { Config } = require("../../configs/config");
const { hashPassword } = require("./util");
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_RE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).{8,21}$/;
const emailFormatValid = (value) => {
  return value && EMAIL_RE.test(value) ? false : "email invalid format";
};

const passwordFormatValid = (value) => {
  return value && PASSWORD_RE.test(value) ? false : "password invalid format";
};

const validateUserData = (data) => {
  if (
    (data.email && typeof data.email != "string") ||
    (data.password && typeof data.password != "string") ||
    (data.userType && typeof data.userType != "string")
  ) {
    return [null, ["type error"]];
  }
  let err = null,
    outputData = {},
    errors = [];
  if (data.email) {
    err = emailFormatValid(data.email);
    if (err) {
      errors.push(err);
    } else {
      outputData.email = data.email;
    }
  }
  if (data.password) {
    err = passwordFormatValid(data.password);
    if (err) {
      errors.push(err);
    } else {
      outputData.password = data.password;
    }
  }

  let userTypeValue = null;
  if (data.userType) {
    userTypeValue = userTypeValid(data.userType);
    if (!userTypeValue) {
      errors.push("usertype invalid");
    }
  }

  return [{ ...outputData, ...{ userType: userTypeValue } }, errors];
};

module.exports = {
  emailFormatValid,
  passwordFormatValid,

  validateUserData,
};
