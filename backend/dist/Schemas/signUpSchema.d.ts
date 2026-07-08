import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    remeberMe: typeof z.optional;
}, z.core.$strip>;
//# sourceMappingURL=signUpSchema.d.ts.map