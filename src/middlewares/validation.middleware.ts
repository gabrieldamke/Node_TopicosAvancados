import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";

const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    const data = (req as any)[value];
    validate(plainToClass(type, data), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {}).join(", ")
          )
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
