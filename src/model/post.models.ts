import mongoose, {Schema, Document} from "mongoose";

export interface Post extends Document {
    title: string,
    content: string,
    userId: Schema.Types.ObjectId,
    groupIds: [Schema.Types.ObjectId],
    upvotes: number,
    downvotes: number,
    tags: [string],
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
    groupIds: [{
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    }],
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    tags: [String],

}, {timestamps: true})

const PostModel = (mongoose.models.Post as mongoose.Model<Post>) || (mongoose.model<Post>("Post", PostSchema))

export default PostModel