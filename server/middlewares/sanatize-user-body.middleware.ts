import { NextFunction, Response } from "express";
import { handleErrorResponse } from "../utils/error-response.util";
import { MyRequest } from "../utils/interfaces.util";

const sanitizeUser = function (
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password, role } = req.body;

    //TODO: add sanitization logic

    req.sanitizedUser = {
      username,
      email,
      password,
      role,
    };

    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};

export default sanitizeUser;
