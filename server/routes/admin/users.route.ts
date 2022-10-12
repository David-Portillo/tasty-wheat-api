import express from "express";
import {
  updateUser,
  getUser,
  createUser,
} from "../../controllers/admin/users.controller";
import { sanitizeUser } from "../../middlewares/user-sanitizer.middleware";
import { validateUserBody } from "../../middlewares/user-validator.middleware";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(getUser)
  .post(createUser)
  .patch(validateUserBody, sanitizeUser, updateUser);

export default userRouter;
