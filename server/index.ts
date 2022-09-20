import express from "express";
import connectDB from "../config/db";
import authRouter from "./routes/authentication.middleware";
import userRouter from "./routes/users.middleware";

const app = express();

const PORT = process.env.PORT ?? 5000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to Tasty Wheat API");
});

connectDB(); // connect to mongoDB

app.use(express.json()); // body parser

// mount routers

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server successfully running and listening on port ${PORT}`);
});

// handle unhandled promise rejection

process.on("unhandledRejection", (reason: Error, promise) => {
  console.log("Unhandled Rejection at: ", promise, "reason: ", reason);
});
