import mongoose, {Schema, Document} from "mongoose";
import { Post, PostSchema } from "./post.models";

export interface Group extends Document {
    name: string,
    description: string,
}

const GroupSchema: Schema<Group> = new Schema({
    name: {
        type: String,
        required: [true, "GroupName is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
    }
})

export interface User extends Document {
    username: string,
    password: string,
    collegeName: string,
    logo: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    posts: Post[],
    groups: Group[],
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    collegeName:{
        type: String,
        required: true,
        uppercase: true,
        index: true,
        trim: true,
    },
    logo: {
        type: String,
        default: "https://www.gravatar.com/avatar",

    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "VerifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    posts: [PostSchema],
    groups: [GroupSchema],

})