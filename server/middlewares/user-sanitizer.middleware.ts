import { NextFunction, Response } from "express";
import { encryptPassword } from "../utils/encryption.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";
import { Req } from "../utils/interfaces.util";

export const sanitizeUser = function (
  req: Req,
  res: Response,
  next: NextFunction
) {
  try {
    let encryptedPassword: string = "";
    const { username, email, password, role } = req.body;

    if (password) {
      encryptedPassword = encryptPassword(password);
    }

    req.sanitizedUser = {
      username,
      email,
      password: encryptedPassword,
      role,
    };

    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
