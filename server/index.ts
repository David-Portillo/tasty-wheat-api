import express from "express";
import connectDB from "../config/db";
import usersRouter from "./routes/users.route";
import adminRouter from "./routes/admin/users.admin.route";
import { handleException } from "./utils/error-response-handling.util";

const app = express();

const appInit = async () => {
  try {
    const PORT = process.env.PORT ?? 5000;

    app.get("/", (req, res) => {
      res.status(200);
      res.send("Welcome to Tasty Wheat API");
    });

    await connectDB(); // connect to mongoDB

    app.use(express.json()); // body parser

    // mount routers

    // mount users router
    app.use("/api/v1/users", usersRouter);

    // mount admin router
    app.use("/api/v1/admin", adminRouter);

    app.listen(PORT, () => {
      console.log(`Server successfully running and listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(handleException(e));
  }
};

appInit();
