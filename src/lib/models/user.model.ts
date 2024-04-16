import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    thread: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
        }
    ],
    onboarded: {type: Boolean, default: false},
    communities: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Communtites"
        }
    ],

})

export const User = mongoose.models.User || mongoose.model("User", userModel);