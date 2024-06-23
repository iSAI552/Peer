import mongoose, {Schema, Document} from "mongoose";

export interface Group extends Document {
    name: string,
    description: string,
    groupMembers: [Schema.Types.ObjectId],
    groupAdmin: Schema.Types.ObjectId,
    groupCategory: string,
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
    },
    groupMembers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    groupCategory: {
        type: String,
        enum: ["General Topics", "Fields", "Job Groups", "Degree", "Institute"],
        default: "General Topics",
    }

})

const GroupModel = (mongoose.models.Group as mongoose.Model<Group>) || (mongoose.model<Group>("Group", GroupSchema))

export default GroupModel