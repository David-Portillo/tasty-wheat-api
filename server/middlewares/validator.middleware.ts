import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";
import {
  CustomError,
  ValidatorError,
} from "../utils/customization/custom-error.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";

const validationForUserRegistration: ValidationChain[] = [
  check("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage("username must be between 3 and 30 characters"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage("email must be a valid email format"),
  check("password")
    .trim()
    .escape()
    .isAlphanumeric()
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be between 8 and 30 characters"),
];

export const bodyValidator = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let validations: ValidationChain[] = [];

  const conditionForUserUpdate =
    req.originalUrl.includes("/api/v1/users/") && req.method === "PATCH";
  const conditionForUserRegistration =
    req.originalUrl.includes("/api/v1/auth/register") && req.method === "POST";

  if (conditionForUserUpdate || conditionForUserRegistration) {
    validations = validationForUserRegistration;
  } else {
    throw new CustomError(
      `invalid url for validation, received: ${req.originalUrl}`
    );
  }

  try {
    await axios.all(
      validations.map((validation: ValidationChain) => validation.run(req))
    );
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ValidatorError("validation failed", result.array());
    }
    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
