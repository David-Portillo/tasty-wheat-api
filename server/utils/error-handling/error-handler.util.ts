import { Error, mongo } from "mongoose";
import CustomError from "./CustomError.utils";

type ErrorCodeType = 500 | 404;

interface Exception {
  status: ErrorCodeType;
  message: string;
}
export const handleException = (e: any): Exception => {
  const exception: Exception = { status: 500, message: "" };

  // mongo DB error handling
  if (e instanceof mongo.MongoError) {
    // dup key error collection
    if (e.code === 11000) {
      exception.message = "sorry, user already exists";
    }
  }

  // mongo casting error
  else if (e instanceof Error.CastError) {
    if (e.kind === "ObjectId") {
      exception.status = 404;
      exception.message = "that doesn't seem right";
    } else if (e.kind === "Boolean") {
      exception.message = e.message;
    }
  }

  // custom error message handling
  else if (e instanceof CustomError) {
    exception.message = e.message;
  }

  // generic error message handling
  else if (e instanceof Error) {
    exception.message = e.message;
  }

  return exception;
};
