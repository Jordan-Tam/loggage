import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { closeConnection } from "@/mongodb/mongoConnection.js";
import { users } from "@/mongodb/mongoCollections.js";

const bagSchema = new mongoose.Schema({
    name: String,
    type: [
        "Backpack",
        "Suitcase",
        "Handbag",
        "Duffel bag",
        "Thermal bag",
        "Reusable shopping bag",
        "Drawstring bag",
        "Paper bag",
        "Plastic bag",
        "Box",
        "Other"
    ],
    customType: String,
    height: Number,
    length: Number,
    width: Number,
    weight: Number,
    storageVolume: Number,
    notes: String,
    assignedTo: mongoose.Schema.Types.ObjectId
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },
    category: {
        type: String,
        validate: {
            validator: async function (str) {
                const parent = this.parent();
                return parent && parent.categories.includes(str);
            }
        },
        message: props => `${props.value} is not a valid category.`
    },
    bag: {
        type: String,
        validate: {
            validator: async function (str) {
                const parent = this.parent();
                return parent && parent.bags.includes(str);
            },
            message: props => `${props.value} is not a valid bag.`
        }
    },
    quantity: {
        type: Number
    },
    weight: {
        type: Number
    },
    individualOrTotal: {
        type: ["individual", "total"]
    },
    notes: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const packingListSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Owner must be provided."],
        validate: [
            {
                validator: async function(str) {
                    const usersCollection = await users();
                    const user = await usersCollection.findOne({
                        _id: new ObjectId(str)
                    });
                    if (!user) {
                        return false;
                    }
                    await closeConnection();
                    return true;
                },
                message: "User doesn't exist."
            }
        ]
    },
    name: {
        type: String,
        required: [true, "Packing list name must be provided."],
        minLength: [1, "Packing list name must be betweeen 1-30 characters long."],
        maxLength: [30, "Packing list name must be betweeen 1-30 characters long."],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    collaborators: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    bags: {
        type: [bagSchema],
        default: []
    },
    categories: {
        type: [labelSchema],
        default: []
    },
    items: {
        type: [itemSchema],
        default: []
    },
    weightUnit: {
        type: ["lb", "kg"],
        default: "lb"
    }
});

const packingListModel = mongoose.model("Packing List", packingListSchema);

export default packingListModel;