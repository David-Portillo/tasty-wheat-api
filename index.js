const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to Tasty Wheat");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server successfully running and listening on port ${PORT}`);
  } else {
    console.log("Error occurred, server cannot start", error);
  }
});
