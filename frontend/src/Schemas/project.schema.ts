import {z} from 'zod'
import { ProjectStatus } from '../types/enums/project.enum'

 const createProjectSchema=z.object({
    name:z.string()
    .min(4,'name must be at least 4 characters.')
    .max(64,'name must be at least 64 characters.'),
    description:z.string()
    .min(10,'description must be at least 8 characters.')
    .max(10000,'description must be at least 10000 characters.'),
    dueDate:z.string().min(1,'DueDate is required'),
    colour:z.string(),
    members: z.array(z.string().min(1,'Select members please'))
})

 const updateProjectSchema = z.object({
  name: z
    .string()
    .min(4, "name must be at least 4 characters.")
    .max(64, "name must be at least 64 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "name must be at least 8 characters.")
    .max(10000, "name must be at least 10000 characters.")
    .optional(),
    dueDate:z.string(),
    colour: z.string().optional()
  });

export {createProjectSchema,updateProjectSchema}