import {z} from "zod";

export const signInSchema = z.object({
    username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),

    password: z.string().max(20)

})