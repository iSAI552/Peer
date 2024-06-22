import mongoose, {Schema, Document} from "mongoose";
import { Post, PostSchema } from "./post.models";
import { Group, GroupSchema } from "./group.models";


export interface User extends Document {
    username: string,
    password: string,
    collegeName: string,
    logo: string,
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
    posts: [PostSchema],
    groups: [GroupSchema],

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel