import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    content: string,
    media: string,
}

const MessageSchema: Schema<Message> = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
    },
    media: {
        type: String, // Cloudinary Url
    }
}, {timestamps: true})

const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("Message", MessageSchema))

export default MessageModel