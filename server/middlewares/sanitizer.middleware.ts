import { NextFunction, Response } from "express";
import { encrypt } from "../utils/helpers.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";
import { Req } from "../utils/customization/custom-request.util";

export const sanitizeUserBody = function (
  req: Req,
  res: Response,
  next: NextFunction
) {
  try {
    let encryptedPassword: string = "";
    const { username, email, password, role } = req.body;

    if (password) {
      encryptedPassword = encrypt(password);
    }

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
