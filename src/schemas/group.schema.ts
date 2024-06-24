import {z} from "zod";

export const groupSchema = z.object({
    name: z
    .string()
    .min(2, { message: "Group name must be of atleast 2 characters" })
    .max(20, { message: "Group name must be no longer than 20 characters" }),

    description: z
    .string()
    .min(10, { message: "Description must be of atleast 10 characters" })
    .max(50, { message: "Content must be no longer than 50 characters" }),

    groupCategory: z.enum(["General Topics", "Fields", "Job Groups", "Degree", "Institute"])

})