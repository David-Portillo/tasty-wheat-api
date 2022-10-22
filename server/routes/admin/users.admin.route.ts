import express from "express";
import { updateUser, getUser, createUser } from "../../controllers/admin/users.admin.controller";

const adminRouter = express.Router();

adminRouter.route("/users").post(createUser);
adminRouter.route("/users/:id").get(getUser).patch(updateUser);

export default adminRouter;
