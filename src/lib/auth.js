import { betterAuth } from "better-auth";
import { customSession, username } from "better-auth/plugins";
import { ObjectId, MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

// Pass the native MongoDB client to Better Auth so it can manage the user, account, and session collections on our behalf.
const client = new MongoClient("mongodb://localhost:27017/loggage");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
    transaction: false
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  },
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false
  },
  plugins: [
    username({
      minUsernameLength: 8,
      maxUsernameLength: 20,
      usernameNormalization: (username) => {
        return username; // stop automatic lowercase conversion
      },
      usernameValidator: (username) => {
        if (false) {
          return false;
        } else {
          return true;
        }
      }
    }),
    customSession(({ user, session }) => {
      return {
        user: {
          ...user,
          packingLists: user.packingLists.map((p) => (
            (new ObjectId(new Uint8Array(Object.values(p.buffer)))).toString()
          ))
        },
        session
      }
    })
  ],
  user: {
    additionalFields: {
      testStrings: {
        type: "string[]",
        defaultValue: [],
        required: false,
        input: false
      },
      packingLists: {
        type: "string[]",
        defaultValue: [],
        required: false,
        input: false,
      },
      templates: {
        type: "string[]",
        defaultValue: [],
        required: false,
        input: false,
      },
      favoritedTemplates: {
        type: "string[]",
        defaultValue: [],
        required: false,
        input: false,
      },
      friends: {
        type: "string[]",
        defaultValue: [],
        required: false,
        input: false,
      },
    }
  }
});

// We will talk to MongoDB through the Mongoose wrapper to enforce schemas on all other collections we want to create.
await mongoose.connect("mongodb://localhost:27017/loggage");