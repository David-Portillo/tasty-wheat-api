import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { ValidatorError } from "../utils/customization/custom-error.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";

const validations = [
  check("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("username must be between 3 and 30 characters"),
  check("email").isEmail().withMessage("email must be a valid email format"),
  check("password")
    .isAlphanumeric()
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be between 8 and 30 characters"),
];

export const validateUserBody = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await axios.all(validations.map((validation) => validation.run(req)));
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ValidatorError("validation failed", result.array());
    }
    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
