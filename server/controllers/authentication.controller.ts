import { Response } from "express";
import { Req } from "../utils/customization/custom-request.util";
import { handleErrorResponse } from "../utils/error-handling/error-response.util";

import User from "../models/User.model";
import { token } from "../utils/helpers.util";

export const registerUser = async function (
  req: Req,
  res: Response
): Promise<void> {
  const data = { ...req.sanitizedUser };
  const user = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  const { signedToken, cookieOpts } = token(user);

  res.status(201).cookie("token", signedToken, cookieOpts).json({
    token: signedToken,
  });

  try {
  } catch (e) {
    handleErrorResponse(e, res);
  }
};
