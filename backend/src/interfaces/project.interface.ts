import { Document, Types } from "mongoose";
import { ProjectStatus } from "../types/enums/project.enum.js";


export interface IProject extends Document{
    name:string;
    description:string;
    thumbnail?:{ url: String; localPath: String };
    status: ProjectStatus;
    colour:string;
    members:Types.ObjectId[];
}