import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {users} from "@/mongodb/mongoCollections.js";
import PackingList from "@/models/packingListSchema.js";
import {GraphQLError} from 'graphql';

export const resolvers = {

    Query: {

        getAllUsers: async () => {
            const usersCollection = await users();
            const usersList = await usersCollection.find({}).toArray();
            if (!usersList) {
                throw new GraphQLError("Internal Server Error", {
                    extensions: {code: "INTERNAL_SERVER_ERROR"}
                });     
            }
            return usersList;
        },

        getAllPackingListsOfUser: async(_, args, ctx) => {

            // Make sure that the user currently signed in is accessing their own data and not someone else's.
            if (args.userId !== ctx.user.id) {
                throw new GraphQLError("You are not authorized to perform this action.", {
                    extensions: {code: "FORBIDDEN"}
                });
            }

            // Retrieve all packing lists where the user is the owner or a collaborator.
            return (await PackingList.find({
                _id: { $in: ctx.user.packingLists }
            }));

            /* return (await PackingList.find({
                $or: [
                    { owner: args._id },
                    { collaborators: args._id }
                ]
            })); */

        },

        getPackingListOfUser: async (_, args, ctx) => {

            // Make sure that the user currently signed in is accessing their own data and not someone else's.
            if (args.userId !== ctx.user.id) {
                throw new GraphQLError("You are not authorized to perform this action.", {
                    extensions: {code: "FORBIDDEN"}
                });
            }



        }

    },
    
    Mutation: {

        createPackingList: async (_, args, ctx) => {

            // Make sure that the user currently signed in is updating their own data and not someone else's.
            if (args._id !== ctx.user.id) {
                throw new GraphQLError("You are not authorized to perform this action.", {
                    extensions: {code: "FORBIDDEN"}
                });
            }  

            return (await PackingList.create({
                owner: args._id,
                name: args.name,
                description: args.description
            }));

        },

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