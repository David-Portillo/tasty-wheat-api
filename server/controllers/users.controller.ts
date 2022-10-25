import { Request, Response } from "express";
import { CustomError, handleErrorResponse } from "../utils/error-response-handling.util";

import User from "../models/User.model";
import { encryptInput } from "../utils/helper-methods.util";

export const registerUser = async function (req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body;

    let encryptedPassword: string = "";
    if (password) {
      encryptedPassword = encryptInput(password);
    }

    const user = await User.create({ username, email, password: encryptedPassword });

    const { signedToken, cookieOpts } = user.getSignedJwtToken();

    res.status(201).cookie("token", signedToken, cookieOpts).json({ token: signedToken });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};

// export const updateUser = async function (req: Request, res: Response) {
//   try {
//     const { id } = req.params;
//     const { password, ...rest } = req.body;
//     const queryOptions: QueryOptions = { new: true, runValidators: true };

//     let encryptedPassword: string = "";
//     if (password) {
//       encryptedPassword = encrypt(password);
//     }
//     const user = await User.findByIdAndUpdate(id, { password: encryptedPassword, ...rest }, queryOptions);
//     res.status(200).json({ user });
//   } catch (e) {
//     handleErrorResponse(e, res);
//   }
// };

export const loginUser = async function (req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError("invalid credentials", 401);
    }

    const isPasswordMatching = user.matchPassword(password);

    if (!isPasswordMatching) {
      throw new CustomError("invalid credentials", 401);
    }

    const { signedToken, cookieOpts } = user.getSignedJwtToken();

    res.status(200).cookie("token", signedToken, cookieOpts).json({ token: signedToken });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
