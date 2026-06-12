/* import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // Better Auth managed
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    email: String,
    emailVerified: Boolean,
    createdAt: Date,
    updatedAt: Date,
    username: String,
    displayUsername: String,

    // Additional fields
    testStrings: [{
        type: String
    }],
    packingLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Packing List"
    }],
    templates: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Template"
    }],
    favoritedTemplates: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Template"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
    
}, { strict: false });

const userModel = mongoose.models.User || mongoose.model("user", userSchema, "user");

export default userModel; */