import { Request, Response } from "express";
import { QueryOptions } from "mongoose";
import User from "../../models/User.model";
import { handleErrorResponse } from "../../utils/error-response-handling.util";
import { encryptInput } from "../../utils/helper-methods.util";

export const createUser = async function (req: Request, res: Response): Promise<void> {
  const { password, ...rest } = req.body;

  let encryptedPassword: string = "";
  if (password) {
    encryptedPassword = encryptInput(password);
  }

  try {
    const user = await User.create({ password: encryptedPassword, ...rest });
    res.status(201).json({ user });
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

export const updateUser = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;
    const queryOptions: QueryOptions = { new: true };

    let encryptedPassword: string = "";
    if (password) {
      encryptedPassword = encryptInput(password);
    }
    const user = await User.findByIdAndUpdate(id, { password: encryptedPassword, ...rest }, queryOptions);
    res.status(200).json({ user });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
