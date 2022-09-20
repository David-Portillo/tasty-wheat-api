import express from "express";
import { registerUser } from "../controllers/authentication.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

export default authRouter;
