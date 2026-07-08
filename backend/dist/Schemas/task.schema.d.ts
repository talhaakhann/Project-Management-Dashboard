import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "../types/enums/task.enum.js";
declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodDate;
    status: z.ZodEnum<typeof TaskStatusEnum>;
    priority: z.ZodEnum<typeof TaskPriorityEnum>;
    assigneesIds: z.ZodArray<z.ZodString>;
    tag: z.ZodString;
}, z.core.$strip>;
declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodDate;
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatusEnum>>;
    priority: z.ZodOptional<z.ZodEnum<typeof TaskPriorityEnum>>;
}, z.core.$strip>;
export { createTaskSchema, updateTaskSchema };
//# sourceMappingURL=task.schema.d.ts.map