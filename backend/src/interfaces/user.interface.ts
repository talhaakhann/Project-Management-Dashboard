import type { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password:string;
  avatar: { url: string; localPath: string };
  refreshToken:string;
  accessToken:string;
  role:string;
  isActive:boolean;
  generateAccessToken():string;
  generateRefreshToken():string;
  generateTemporaryToken():{};
  isPasswordValid(password:string):Promise<boolean>
}
