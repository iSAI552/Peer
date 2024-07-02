import mongoose, {Schema, Document} from "mongoose";

export interface Post extends Document {
    title: string,
    content: string,
    userId: Schema.Types.ObjectId,
    groupNames: [string],
    likes: number,
    tags: [string],
    instituteOnly: boolean,
    mediaURL: string,
}

export const PostSchema: Schema<Post> = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupNames: [{
        type: String,
        required: true
    }],
    likes: {
        type: Number,
        default: 0,
    },
    instituteOnly:{
        type: Boolean,
        default: false,
    },
    tags: [String],
    mediaURL: {
        type: String, // Cloudinary URL
    }

}, {timestamps: true})

const PostModel = (mongoose.models.Post as mongoose.Model<Post>) || (mongoose.model<Post>("Post", PostSchema))

export default PostModel