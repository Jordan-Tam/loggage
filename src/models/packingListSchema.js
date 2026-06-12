import {ObjectId} from "mongodb";
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },
    labels: {
        type: [labelSchema]
    },
    bag: {
        type: [bagSchema]
    },
    quantity: {
        type: Number
    },
    notes: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const labelSchema = new mongoose.Schema({
    full: {
        type: Boolean
    }
});

const bagSchema = new mongoose.Schema({

});

const packingListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Packing list name must be provided."],
        minLength: [1, "Packing list name must be betweeen 1-30 characters long."],
        maxLength: [30, "Packing list name must be betweeen 1-30 characters long."],
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner must be provided."],
        validate: [
            {
                validator: async function(str) {
                    const owner = await mongoose.models.User.findOne({
                        _id: new ObjectId(str)
                    });
                    if (!owner) {
                        return false;
                    }
                    return true;
                },
                message: "User doesn't exist."
            }
        ]
    },
    collaborators: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    items: {
        type: [itemSchema],
        default: []
    },
    bags: {
        type: [bagSchema],
        default: []
    },
    labels: {
        type: [labelSchema],
        default: []
    }
});

const packingListModel = mongoose.model("Packing List", packingListSchema);

export default packingListModel;