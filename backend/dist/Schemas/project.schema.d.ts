import { z } from 'zod';
import { AvailableProjectColour } from '../types/enums/project.enum.js';
declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    colour: z.ZodEnum<typeof AvailableProjectColour>;
    members: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    colour: z.ZodOptional<z.ZodEnum<typeof AvailableProjectColour>>;
}, z.core.$strip>;
export { createProjectSchema, updateProjectSchema };
//# sourceMappingURL=project.schema.d.ts.map