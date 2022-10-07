import { Response } from "express";
import { handleException } from "./error-handler.util";

export const handleErrorResponse = (e: any, res: Response): void => {
  const exception = handleException(e);
  res.status(exception.status).json(exception);
};
