import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";
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
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false
  },
  plugins: [
    username({
      minUsernameLength: 8,
      maxUsernameLength: 20,
      usernameValidator: (username) => {
        if (false) {
          return false;
        } else {
          return true;
        }
      }
    })
  ],
  user: {
    additionalFields: {
      placeholder: {
        type: "string",
        required: false,
        defaultValue: ""
      }
    }
  }
});

// We will talk to MongoDB through the Mongoose wrapper to enforce schemas on all other collections we want to create.
await mongoose.connect("mongodb://localhost:27017/loggage");