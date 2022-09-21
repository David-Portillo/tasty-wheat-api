import { NextFunction, Response } from "express";
import { handleErrorResponse } from "../utils/error-response.util";
import { MyRequest } from "../utils/interfaces.util";
import crypto, { CipherGCMTypes, CipherKey } from "crypto";

const encryptPassword = (password: string): string => {
  const algorithm: CipherGCMTypes = "aes-256-gcm";
  const iv: Buffer = Buffer.alloc(16, 0);
  const securityKey: CipherKey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);

  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");

  return encryptedPassword;
};

const transformFields = (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    if (req.sanitizedUser) {
      const { username, email, password, role } = req.sanitizedUser;

      let encryptedPassword: string = "";

      if (password) {
        encryptedPassword = encryptPassword(password);
      }

      req.sanitizedUser = {
        username,
        email,
        password: encryptedPassword,
        role,
      };
    }
    next();
  } catch (e) {
    handleErrorResponse(e, res);
  }
};

export default transformFields;
