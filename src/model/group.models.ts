import mongoose, {Schema, Document} from "mongoose";

export interface Group extends Document {
    name: string,
    description: string,
}

export const GroupSchema: Schema<Group> = new Schema({
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

const GroupModel = (mongoose.models.Group as mongoose.Model<Group>) || (mongoose.model<Group>("Group", GroupSchema))

export default GroupModel