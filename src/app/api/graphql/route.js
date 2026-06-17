import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import {GraphQLError} from 'graphql';
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";
import { auth } from "@/lib/auth";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req) => {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        // If user is logged out, session === null.

        console.log(session);

        if (session) {
            return {
                session,
                user: session.user
            };
        } else {
            throw new GraphQLError(
                "You need to be signed in to perform this action.", {
                extensions: {code: "UNAUTHENTICATED"}
            });
        }
    }
});

export { handler as GET, handler as POST };