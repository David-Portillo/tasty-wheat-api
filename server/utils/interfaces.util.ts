import { Request } from "express";

interface IUser {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  disabled?: boolean;
}

export interface MyRequest extends Request {
  sanitizedUser?: IUser;
}
