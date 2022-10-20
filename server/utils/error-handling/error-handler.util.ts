import { Error as MongooseError, mongo } from "mongoose";
import {
  CustomError,
  ValidatorError,
} from "../customization/custom-error.util";

type ErrorCodeType = 500 | 404;

interface Exception {
  status: ErrorCodeType;
  message: string;
  details: string | string[] | undefined | {};
}
export const handleException = (e: any): Exception => {
  const exception: Exception = { status: 500, message: "", details: undefined };

  // mongo db error handling
  if (e instanceof mongo.MongoError) {
    // dup key error collection
    if (e.code === 11000) {
      exception.message = "sorry, user already exists";
    }
  }

  // mongoose casting error
  else if (e instanceof MongooseError.CastError) {
    if (e.kind === "ObjectId") {
      exception.status = 404;
      exception.message = "that doesn't seem right";
    } else if (e.kind === "Boolean") {
      exception.message = e.message;
    }
  }

  // mongoose validation error handling
  else if (e instanceof MongooseError.ValidationError) {
    exception.message = e.message;
    exception.details = e.errors;
  }

  // express-validator validation error handling
  else if (e instanceof ValidatorError) {
    exception.message = e.message;
    exception.details = e.errors.map((error) => error.msg);
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
