import express from "express";
import { registerUser } from "../controllers/authentication.controller";
import sanitizeUser from "../middlewares/sanatize-user-body.middleware";
import transformFields from "../middlewares/transform-user-fields.middleware";

const authRouter = express.Router();

authRouter.post("/register", sanitizeUser, transformFields, registerUser);

export default authRouter;
