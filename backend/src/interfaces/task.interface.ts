import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority:string;
  status: string;
  dueDate: Date;
  createdBy:Types.ObjectId;
  tags:string[]
  projectId: Types.ObjectId;
  assignees: Types.ObjectId[];
}
