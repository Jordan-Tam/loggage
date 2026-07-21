import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {users} from "@/mongodb/mongoCollections.js";
import PackingList from "@/models/packingListSchema.js";
import {GraphQLError} from 'graphql';

export const resolvers = {

    PackingList: {

        owner: async (parentValue) => {
            const usersCollection = await users();
            const user = await usersCollection.findOne({
                _id: parentValue.owner
            });
            if (!user) {
                throw new GraphQLError("User Not Found", {
                    extensions: {code: "NOT_FOUND"}
                });
            }
            return user;
        },

        categoryView: async (parentValue) => {
            let returnValue = [];
            for (const category of parentValue.categories) {
                let newEntry = {
                    category,
                    items: []
                };
                for (const item of parentValue.items) {
                    if (item.category == category) {
                        newEntry.items.push(item)
                    }
                }
                returnValue.push(newEntry);
            }
            return returnValue;
        }

    },

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
                _id: { $in: ctx.user.packingLists.map((i) => new ObjectId(i)) }
            }));

        },

        getPackingListOfUser: async (_, args, ctx) => {

            // Make sure that the user currently signed in is accessing their own data and not someone else's.
            if (args.userId !== ctx.user.id) {
                throw new GraphQLError("You are not authorized to perform this action.", {
                    extensions: {code: "FORBIDDEN"}
                });
            }

            // Retrieve packing list.
            const pl = await PackingList.findOne({
                _id: new ObjectId(args.listId)
            });

            if (!pl) {
                throw new GraphQLError("Packing list not found.", {
                    extensions: {code: "NOT_FOUND"}
                });   
            }

            // Check if the packing list belongs to the user.
            if (pl.owner.toString() !== args.userId || pl.collaborators.includes(new ObjectId(args.userId))) {
                throw new GraphQLError("Packing list not found.", {
                    extensions: {code: "NOT_FOUND"}
                });   
            }

            return pl;

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