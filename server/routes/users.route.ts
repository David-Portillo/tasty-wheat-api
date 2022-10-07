import express from "express";
import { updateUser, getUser } from "../controllers/authentication.controller";
import { sanitizeUser } from "../middlewares/user-sanitizer.middleware";
import { validateUserBody } from "../middlewares/user-validator.middleware";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(getUser)
  .patch(validateUserBody, sanitizeUser, updateUser);

export default userRouter;
