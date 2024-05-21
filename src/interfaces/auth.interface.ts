import User from "./user.interface";
import { Request as ExpressRequest } from "express";
export interface DataStoredInToken {
  _id: string;
}

export interface RequestWithUser extends ExpressRequest {
  user: User;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
