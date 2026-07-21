import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { closeConnection } from "@/mongodb/mongoConnection.js";
import { users } from "@/mongodb/mongoCollections.js";

const bagSchema = new mongoose.Schema({
    name: String,
    type: String,
    // height: Number,
    // length: Number,
    // width: Number,
    // weight: Number,
    // storageVolume: Number,
    notes: String,
    belongsTo: mongoose.Schema.Types.ObjectId
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
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId
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
                    // await closeConnection(); This line causes the error "Packing List validation failed: owner: Client must be connected before running operations"
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
        type: [String],
        default: []
    },
    items: {
        type: [itemSchema],
        default: []
    }
});

packingListSchema.pre("save", async function() {
    this.$locals.wasNew = this.isNew;
    this.$locals.wasOwner = this.owner;
    this.$locals.wasOwnerModified = this.isModified("owner");
});

packingListSchema.pre("deleteOne", { document: false, query: true }, async function() {
    this._doc = await this.model.findOne(this.getQuery());
})

packingListSchema.post("save", async function(doc) {
    console.log("Post save");
    if (doc.$locals.wasNew) {
        const usersCollection = await users();
        const updateOwnerDocument = await usersCollection.findOneAndUpdate(
            { _id: doc.owner },
            { $push: {packingLists: doc._id }},
            { returnDocument: "after" }
        );
    } else {
        if (doc.$locals.wasOwnerModified) {
            const updateOwnerDocument1 = await usersCollection.findOneAndUpdate(
                { _id: doc.$locals.wasOwner },
                { $pull: {packingLists: doc._id }},
                { returnDocument: "after" }
            );
            const updateOwnerDocument2 = await usersCollection.findOneAndUpdate(
                { _id: doc.owner },
                { $push: {packingLists: doc._id }},
                { returnDocument: "after" }
            )
        }
    }
});

// For "await packingList.findOne({ _id: args._id }).deleteOne()"
packingListSchema.post("deleteOne", { document: true, query: false }, async function(doc) {
    const usersCollection = await users();
    const updateOwnerDocument = await usersCollection.findOneAndUpdate(
        { _id: doc.owner },
        { $pull: {packingLists: doc._id} },
        { returnDocument: "after" }
    );
});

// For "await packingList.deleteOne({ _id: args._id })"
packingListSchema.post("deleteOne", { document: false, query: true }, async function() {
    const usersCollection = await users();
    const updateOwnerDocument = await usersCollection.findOneAndUpdate(
        { _id: this._doc.owner },
        { $pull: {packingLists: this._doc._id } },
        { returnDocument: "after" }
    );
});

console.log(mongoose.modelNames());
const packingListModel = mongoose.models['Packing List'] || mongoose.model("Packing List", packingListSchema);

export default packingListModel;