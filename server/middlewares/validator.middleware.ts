import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";
import { HttpMethodStrings } from "../utils/constants.util";
import { ValidatorError } from "../utils/customization/custom-error.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";
import { getValidationRules } from "../utils/validation-rules-handling/validation-rules-selector.util";

export const bodyValidator = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const validations: NonNullable<ValidationChain>[] = getValidationRules(req.originalUrl, req.method as HttpMethodStrings);

    await axios.all(validations.map((validation: ValidationChain) => validation.run(req)));
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ValidatorError("validation failed", result.array());
    }
    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
