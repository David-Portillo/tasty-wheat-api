import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import { handleException } from "../utils/error-handler.util";

export const register = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(200).json({ message: "user successfully created" });
  } catch (e) {
    const exception = handleException(e);
    res.status(exception.status).json(exception);
  }
};
