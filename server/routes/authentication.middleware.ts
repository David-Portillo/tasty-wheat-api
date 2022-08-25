import express from "express";
import { register } from "../controllers/authentication.controller";

const authRouter = express.Router();

authRouter.post("/register", register);

export default authRouter;
