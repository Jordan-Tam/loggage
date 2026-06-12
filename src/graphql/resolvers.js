import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import User from "@/models/userSchema";
import {users} from "@/mongodb/mongoCollections.js";

export const resolvers = {
    
    Mutation: {

        addTestString: async (_, args) => {

            const usersCollection = await users();

            console.log(new ObjectId(args._id));

            const user = await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(args._id) },
                { $push: {testStrings: args.testString} },
                { returnDocument: "after" }
            );

            return user;

            console.log("hello1");

            console.log(args);

            console.log(mongoose.connection.name);
            console.log(mongoose.connection.host);

            let allUsers;
            try {
                allUsers = await User.find({});
                /* user = await User.findOne({
                    name: args._id
                }); */
            } catch (e) {
                console.log("Error: " + e);
            }

            console.log(allUsers);
            
            /* console.log("hello2");

            allUsers.testStrings = [...allUsers.testStrings, args.testString];

            console.log("hello3");

            await allUsers.save(); */

        }

    }

}