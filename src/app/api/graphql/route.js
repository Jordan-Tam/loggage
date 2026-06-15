import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
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

        return {
            session,
            user: session.user
        }
    }
});

export { handler as GET, handler as POST };