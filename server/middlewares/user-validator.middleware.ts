import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import CustomError from "../utils/error-handling/CustomError.utils";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";

const validations = [
  check("username").isLength({ min: 3, max: 30 }),
  check("email").isEmail(),
  check("password").isAlphanumeric().isLength({ min: 8, max: 30 }),
];

export const validateUserBody = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await axios.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError("validation errors");
    }
    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
