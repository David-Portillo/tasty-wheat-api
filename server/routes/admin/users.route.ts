import express from "express";
import {
  updateUser,
  getUser,
  createUser,
} from "../../controllers/admin/users.controller";
import { sanitizeUserBody } from "../../middlewares/sanitizer.middleware";
import { bodyValidator } from "../../middlewares/validator.middleware";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(getUser)
  .patch(bodyValidator, sanitizeUserBody, updateUser);

userRouter.route("/").post(bodyValidator, sanitizeUserBody, createUser);

export default userRouter;
