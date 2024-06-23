import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/create-org';
import { z } from 'zod';
declare const createAccountBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    whatsapp: z.ZodString;
    authorName: z.ZodString;
    cep: z.ZodString;
    state: z.ZodString;
    city: z.ZodString;
    neighborhood: z.ZodString;
    street: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    address: string;
    whatsapp: string;
    authorName: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    latitude: number;
    longitude: number;
}, {
    name: string;
    email: string;
    password: string;
    address: string;
    whatsapp: string;
    authorName: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    latitude: number;
    longitude: number;
}>;
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
export declare class CreateAccountContoller {
    private registerOrg;
    constructor(registerOrg: RegisterOrgUseCase);
    handle(body: CreateAccountBodySchema): {
        name: string;
        email: string;
        password: string;
        address: string;
        whatsapp: string;
        authorName: string;
        cep: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        latitude: number;
        longitude: number;
    };
}
export {};
