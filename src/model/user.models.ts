import mongoose, {Schema, Document} from "mongoose";
import { Post, PostSchema } from "./post.models";


export interface User extends Document {
    username: string,
    password: string,
    collegeName: string,
    logo: string,
    posts: Post[],
    groupsFollowing: [Schema.Types.ObjectId],
    likedPosts: [Schema.Types.ObjectId],
    likedComments: [Schema.Types.ObjectId],
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
    groupsFollowing: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
    }],
    likedComments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel