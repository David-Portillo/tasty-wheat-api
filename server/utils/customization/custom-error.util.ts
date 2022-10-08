import { ValidationError } from "express-validator";

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidatorError extends Error {
  errors: ValidationError[];

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors;
  }
}
