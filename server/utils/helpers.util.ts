import crypto, { CipherGCMTypes, CipherKey } from "crypto";
import { CookieOptions } from "express";
import { InferSchemaType } from "mongoose";
import User, { IUser } from "../models/User.model";

export const encrypt = (password: string): string => {
  const algorithm: CipherGCMTypes = "aes-256-gcm";
  const iv: Buffer = Buffer.alloc(16, 0);
  const securityKey: CipherKey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);

  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");

  return encryptedPassword;
};

export const token = (
  user: IUser
): { signedToken: string; cookieOpts: CookieOptions } => {
  const signedToken = user.getSignedJwtToken();

  const options: CookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env?.ENV === "prod" ? true : false,
  };

  return { signedToken, cookieOpts: options };
};
