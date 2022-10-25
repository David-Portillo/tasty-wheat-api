import mongoose from "mongoose";
import { CustomError, handleException } from "../server/utils/error-response-handling.util";

const connectDB = async (): Promise<void> => {
  if (!process.env?.MONGO_URI) {
    throw new CustomError("mongo uri is undefined");
  }
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((values) => {
      console.log(`mongoDB connected ${values.connection.host}`);
    })
    .catch((e: Error) => {
      console.error(handleException(e));
    });
};

export default connectDB;
