import express from "express";
import { registerUser } from "../controllers/authentication.controller";
import { sanitizeUser } from "../middlewares/user-sanitizer.middleware";
import { validateUserBody } from "../middlewares/user-validator.middleware";

const authRouter = express.Router();

authRouter.post("/register", validateUserBody, sanitizeUser, registerUser);

export default authRouter;
