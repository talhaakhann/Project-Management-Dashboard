import "express";
import { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../interfaces/user.interface.ts";
import type mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: mongoose.Types.ObjectId;
      };
    }
  }
}

export interface TokenPayload extends JwtPayload{
  _id:string
}

export {};