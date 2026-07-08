import { Document, Types } from "mongoose";
export interface ITask extends Document {
    name: string;
    description: string;
    priority: string;
    status: string;
    dueDate: Date;
    tags: string[];
    project: Types.ObjectId;
    assignees: Types.ObjectId[];
}
//# sourceMappingURL=task.interface.d.ts.map