import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  console.log("awaiting DB connection response");
  await mongoose
    .connect(process.env?.MONGO_URI ?? "")
    .then((values) => {
      console.log(`mongoDB connected ${values.connection.host}`);
    })
    .catch((reason: Error) => {
      console.log(
        "an error occurred when attempting to connect to DB",
        "reason: ",
        reason
      );
    });
};

export default connectDB;
