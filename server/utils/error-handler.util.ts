import { mongo } from "mongoose";

type ErrorCodeType = 500 | 200;

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

  // generic error message handling
  else if (e instanceof Error) {
    exception.message = e.message;
  }

  return exception;
};
