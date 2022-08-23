import express from "express";

const app = express();

const PORT = process.env.PORT ?? 5000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to Tasty Wheat API");
});

app.listen(PORT, () => {
  console.log(`Server successfully running and listening on port ${PORT}`);
});

// handle unhandled promise rejection

process.on("unhandledRejection", (reason: Error, promise) => {
  console.log("Unhandled Rejection at: ", promise, "reason: ", reason);
});