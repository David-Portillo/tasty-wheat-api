import { Request, Response } from "express";
import { QueryOptions } from "mongoose";
import User from "../models/User.model";
import { handleErrorResponse } from "../utils/error-response.util";
import { MyRequest } from "../utils/interfaces.util";

export const registerUser = async function (
  req: MyRequest,
  res: Response
): Promise<void> {
  const data = { ...req.sanitizedUser };

  try {
    await User.create({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
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

export const updateUser = async function (req: MyRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = { ...req.sanitizedUser };
    const queryOptions: QueryOptions = { new: true, runValidators: true };
    await User.findByIdAndUpdate(
      id,
      { disabled: data.disabled, password: data.password },
      queryOptions
    );
    res.status(200).json({ message: "user successfully updated" });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
