import {z} from "zod";
import { verifyCodeSchema } from "./verifyCode.schema";

export const usernameValidation = z
.string()
.min(2, "Username must be atleast 2 characters long")
.max(10, "Username must be no more than 20 characters long")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" })
    .max(20, { message: "password length should be less than 20 characters" }),
    email: z.string(),
    otp: verifyCodeSchema
});

export const emailValidation = z.string().email({message: "Invalid Email address"});

