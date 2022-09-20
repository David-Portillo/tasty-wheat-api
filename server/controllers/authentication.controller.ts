import { Request, Response } from "express";
import User from "../models/User.model";
import { handleErrorResponse } from "../utils/error-response.util";

export const registerUser = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { username, email, password, role } = req.body;

  try {
    await User.create({
      username,
      email,
      password,
      role,
    });

    res.status(201).json({ message: "user successfully created" });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};

export const getUser = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
