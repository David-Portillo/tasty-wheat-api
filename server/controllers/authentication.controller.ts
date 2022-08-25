import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";

export const register = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(200).json({ ok: "okay" });
};
