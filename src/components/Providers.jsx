"use client";

import { ApolloProvider } from "@apollo/client/react";
import { MantineProvider } from "@mantine/core";
import { client } from "@/lib/apollo-client";
import MantineShell from "@/components/MantineShell";

export default function Providers({ children }) {
    return (
        <ApolloProvider client={client}>
            <MantineProvider>
                <MantineShell>
                    {children}
                </MantineShell>
            </MantineProvider>
        </ApolloProvider>
    );
}