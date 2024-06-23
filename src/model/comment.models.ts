import mongoose, {Schema, Document} from "mongoose";

export interface Comment extends Document {
    parentPostId: Schema.Types.ObjectId,
    parentCommentId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    content: string,
    likes: number,
}

const CommentSchema: Schema<Comment> = new Schema({
    parentPostId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "parentPostId is required"]
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:[true, "parentCommentId is required"],
    },
    content: {
        type: String,
        required: [true, "Comment Content is required"],
    },
    likes: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

const CommentModel = (mongoose.models.Comment as mongoose.Model<Comment>) || (mongoose.model<Comment>("Comment", CommentSchema))

export default CommentModel