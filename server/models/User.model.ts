import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";
import { matchInput } from "../utils/helper-methods.util";
import { CookieOptions } from "express";
import { CustomError } from "../utils/error-response-handling.util";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please add username"],
    minlength: 3,
    maxlength: 30
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email"
    ]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.getSignedJwtToken = function (): JwtToken {
  if (!process.env?.JWT_SECRET) {
    throw new CustomError("JWT_SECRET is undefined");
  }

  if (!process.env?.JWT_EXPIRE) {
    throw new CustomError("JWT_EXPIRE is undefined");
  }

  if (!process.env?.ENV) {
    throw new CustomError("ENV is undefined");
  }

  const secret = process.env.JWT_SECRET;
  const expires = process.env.JWT_EXPIRE;
  const secure = process.env.ENV === "prod" ? true : false;

  //TODO: explain and place multiplication in a constant
  const options: CookieOptions = { secure, httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };
  const signedToken = jwt.sign({ id: this._id }, secret, { expiresIn: expires });

  return { signedToken, cookieOpts: options };
};

UserSchema.methods.matchPassword = function (enteredPassword: string): boolean {
  return matchInput(enteredPassword, this.password);
};

interface JwtToken {
  signedToken: string;
  cookieOpts: CookieOptions;
}

export declare interface IUser extends InferSchemaType<typeof UserSchema> {
  getSignedJwtToken(): JwtToken;
  matchPassword(enteredPassword: string): boolean;
}

export default mongoose.model<IUser>("User", UserSchema);
