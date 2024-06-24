import {z} from "zod";

export const messageSchema = z.object({
    content: z
    .string()
    .min(2, { message: "Content must be of atleast 2 characters" })
    .max(150, { message: "Content must be no longer than 150 characters" }),

})