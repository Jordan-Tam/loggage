"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
    Button,
    Container,
    Text,
    TextInput
} from "@mantine/core";
import { authClient } from "@/lib/auth-client";

export default function Test() {

    const {
        data: session, isPending
    } = authClient.useSession();

    const [string, setString] = useState("");

    const ADD_TEST_STRING = gql`
        mutation add_test_string(
            $id: String!
            $testString: String!
        ) {
            addTestString(
                _id: $id
                testString: $testString
            ) {
                _id
                testStrings
            }
        }
    `;

    const [addTestString] = useMutation(ADD_TEST_STRING);

    const handleSubmit = async () => {
        try {
            await addTestString({
                variables: {
                    id: session.user.id,
                    testString: string
                }
            });
        } catch (e) {
            console.log("oops");
            console.log(e);
        }
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    if (!session) {
        return <div>Not logged in</div>
    }

    return (
        <>
            <Container className="border-1 border-blue-500">
                <Text className="border-1 border-red-500" ta="center">Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!Hello!!!!!!!!!!!!!!!</Text>
                <Text className="border-1 border-red-500">Hello</Text>
                <Text className="border-1 border-red-500">Hello</Text>
                <Text className="border-1 border-red-500">You are {session.user.email}</Text>
            </Container>
            <Container>
                <TextInput
                    value={string}
                    onChange={(e) => setString(e.currentTarget.value)}
                    label="String"
                    required
                    radius="md"
                />
                <Button fullWidth mt="xl" radius="md" onClick={handleSubmit}>
                    Submit
                </Button>
            </Container>
        </>
    )
}