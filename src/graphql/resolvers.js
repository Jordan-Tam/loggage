import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {users} from "@/mongodb/mongoCollections.js";

export const resolvers = {
    
    Mutation: {

        addTestString: async (_, args, ctx) => {

            const usersCollection = await users();

            console.log(ctx);

            if (ctx.user.id !== args._id) {
                console.log("403 Forbidden");
                return;
            }

            const user = await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(args._id) },
                { $push: {testStrings: args.testString} },
                { returnDocument: "after" }
            );

            return user;

        }

    }

}