import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import userModel from "../models/user.model";
import { HttpException } from "../exceptions/HttpException";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../interfaces/auth.interface";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      (req.header("Authorization")
        ? req.header("Authorization")?.split("Bearer ")[1]
        : null);

    if (Authorization) {
      const secretKey: string = JWT_SECRET_KEY as string;
      const verificationResponse = (await verify(
        Authorization,
        secretKey
      )) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        (req as RequestWithUser).user = findUser;
        next();
      } else {
        next(new HttpException(401, "Token de autenticação inválido."));
      }
    } else {
      next(
        new HttpException(
          400,
          "Token de autenticação não encontrado no cabecalho."
        )
      );
    }
  } catch (error) {
    next(new HttpException(401, "Token de autenticação inválido."));
  }
};

export default authMiddleware;
