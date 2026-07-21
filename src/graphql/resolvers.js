import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {users} from "@/mongodb/mongoCollections.js";
import PackingList from "@/models/packingListSchema.js";
import {GraphQLError} from 'graphql';

export const resolvers = {

    PackingList: {

        // In MongoDB, the "owner" field of a packing list document is of type ObjectId, but in typeDefs.js, the "owner" field is of a custom type called User.
        // This is a type mismatch, so even though the field name is identical in both MongoDB and the GraphQL type definitions, a resolver for the "owner" field is necessary.
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

        // In MongoDB, the "collaborators" field of a packing list document is of type [ObjectId], but in typeDefs.js, "collaborators" is defined as type [User].
        // As of right now, the "collaborators" field of every packing list document is always an empty list since this feature has not been implemented yet. An empty list technically satisfies the [User] type, so GraphQL doesn't throw an error despite the type mismatch, so a resolver for "collaborators" is unnecessary. However, once the collaborators feature is implemented and "collaborators" is no longer empty, this resolver will be necessary because GraphQL will attempt to search for fields like "username" and "email" in a string variable, which will cause a TypeError.
        //collaborators:

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

        /* editPackingList: async (_, args, ctx) => {

        }, */

        deletePackingList: async (_, args, ctx) => {

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