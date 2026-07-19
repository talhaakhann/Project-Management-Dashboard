import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "@/types/enums/task.enum";

 const createTaskSchema = z.object({
  title: z
    .string()
    .min(4, "name must be at least 4 characters.")
    .max(100, "name must be at least 100 characters."),
  description: z
    .string()
    .min(10, "name must be at least 8 characters.")
    .max(10000, "name must be at least 300 characters."),
    priority: z.enum(TaskPriorityEnum),
    projectId:z.string().min(1,"Project is required"),
    dueDate: z.string().min(1,"DueDate is required"),
    assignees: z.array(z.string().min(1,"Assignees are required")),
});

 const updateTaskSchema = z.object({
  title: z
    .string()
    .min(4, "name must be at least 4 characters.")
    .max(10000, "name must be at least 10000 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "name must be at least 10 characters.")
    .max(10000, "name must be at least 10000 characters.")
    .optional(),
  dueDate: z.coerce.date(),
  status: z.enum(TaskStatusEnum).optional(),
  priority: z.enum(TaskPriorityEnum).optional(),
});

export { createTaskSchema, updateTaskSchema };
