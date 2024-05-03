import mongoose from "mongoose"

const ThreadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    createdAt: {type: Date, default: Date.now},
    parentId: {type: String, default: null},
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }]
})

export type ThreadType = mongoose.InferSchemaType<typeof ThreadSchema> & {_id: mongoose.Schema.Types.ObjectId}

export const Thread = mongoose.models.Threads || mongoose.model("Thread", ThreadSchema)