import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    DATABASE_URL: z.ZodString;
}, "strip", z.ZodTypeAny, {
    PORT: number;
    DATABASE_URL: string;
}, {
    DATABASE_URL: string;
    PORT?: number | undefined;
}>;
export type Env = z.infer<typeof envSchema>;
