import { TaskStatusEnum,TaskPriorityEnum } from "./enums/task.enum";



export type TaskStatus = "all"|"todo" | "in_progress" | "done" | "cancelled";
export type TaskPriority = "low" | "medium" | "high" | "urgent";


export interface TaskAssignee {
    id: string;
    fullName: string;
    avatar?: {
        url: string;
        localPath: string;
    };
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
    priority: TaskPriorityEnum;
    assignees?: TaskAssignee[];
    dueDate?: Date;
    project: {
        id:string;
        name:string;
    };
    createdBy:{   
        id:string;
        fullName:string;
        avatar?:{ url: string; localPath: string; };
    };
    createdAt: Date;
    updatedAt: Date;
}
