import express from "express";
import { registerUser } from "../controllers/users.controller";
import { bodyValidator } from "../middlewares/validator.middleware";

const usersRouter = express.Router();

usersRouter.post("/register", bodyValidator, registerUser).post("/login", bodyValidator);

export default usersRouter;
