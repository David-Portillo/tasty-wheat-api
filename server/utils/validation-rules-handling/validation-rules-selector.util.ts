import { check } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";
import { HttpMethodStrings } from "../constants.util";
import { CustomError } from "../customization/custom-error.util";

interface FieldValidation {
  username: ValidationChain;
  email: ValidationChain;
  password: ValidationChain;
}

interface ValidationCondition {
  conditionForUserUpdate: (url: string, method: HttpMethodStrings) => boolean;
  conditionForUserLogin: (url: string, method: HttpMethodStrings) => boolean;
  conditionForUserRegistration: (url: string, method: HttpMethodStrings) => boolean;
}

const condition: ValidationCondition = {
  conditionForUserUpdate: (url, method) => url.includes("/users/") && method === "PATCH",
  conditionForUserLogin: (url, method) => url.includes("/users/login") && method === "POST",
  conditionForUserRegistration: (url, method) => url.includes("/auth/register") && method === "POST"
};

const fieldValidation: FieldValidation = {
  username: check("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage("username must be between 3 and 30 characters"),
  email: check("email")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage("email must be a valid email format"),
  password: check("password")
    .trim()
    .escape()
    .isAlphanumeric()
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be between 8 and 30 characters")
};

export const getValidationRules = function (url: string, method: HttpMethodStrings): NonNullable<ValidationChain>[] {
  let validations: NonNullable<ValidationChain>[] = [];

  if (condition.conditionForUserUpdate(url, method) || condition.conditionForUserRegistration(url, method)) {
    validations = [fieldValidation.username, fieldValidation.email, fieldValidation.password];
  } else if (condition.conditionForUserLogin(url, method)) {
    validations = [fieldValidation.email, fieldValidation.password];
  } else {
    throw new CustomError(`invalid url for validation, received: ${url}`);
  }

  return validations;
};
