import express from "express";
import { registerUser } from "../controllers/authentication.controller";
import { sanitizeUserBody } from "../middlewares/sanitizer.middleware";
import { bodyValidator } from "../middlewares/validator.middleware";

const authRouter = express.Router();

authRouter
  .post("/register", bodyValidator, sanitizeUserBody, registerUser)
  .post("/login", bodyValidator);

export default authRouter;
