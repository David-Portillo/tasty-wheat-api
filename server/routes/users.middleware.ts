import express from "express";
import { getUser } from "../controllers/authentication.controller";

const userRouter = express.Router();

userRouter.route("/:id").get(getUser);

export default userRouter;
