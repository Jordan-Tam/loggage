"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import {
    Anchor,
    Badge,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Group,
    Image,
    Modal,
    Select,
    SimpleGrid,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconDotsVertical,
    IconEdit,
    IconSpeakerphone,
    IconTemplate,
    IconUserPlus
} from '@tabler/icons-react';
import { authClient } from "@/lib/auth-client";

function PackingListCard({ id, name, description, color }) {

    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section withBorder>
                <Box h={150} bg={color ? color : "#6ea5ff"}></Box>
            </Card.Section>
            <Anchor href={`/list/${id}`} mt="md" size="lg" fw={700}>{name}</Anchor>
            <Text mt={5} mb={15} size="sm" lineClamp={3}>{description}</Text>
            <Flex justify="center" align="center" direction="row" wrap="nowrap">
                <Button variant="white" color={color} style={{flexShrink: 0}} vars={(theme, props) => ({
                    root: {
                        '--button-hover': 'var(--mantine-color-red-filled)'
                    }
                })}>
                    <IconEdit stroke={2} />
                </Button>
                <Button variant="white" color={color} style={{flexShrink: 0}}>
                    <IconSpeakerphone stroke={2} />
                </Button>
                <Button variant="white" color={color} style={{flexShrink: 0}}>
                    <IconUserPlus stroke={2} />
                </Button>
                <Button variant="white" color={color} style={{flexShrink: 0}}>
                    <IconTemplate stroke={2} />
                </Button>
                <Button variant="white" color={color} style={{flexShrink: 0}}>
                    <IconDotsVertical stroke={2} />
                </Button>
            </Flex>
        </Card>
    );
}

export default function Lists() {

    const { data: session, isPending, refetch } = authClient.useSession({query: { disableCookieCache: true }});

    const router = useRouter();

    const [opened, { open, close }] = useDisclosure(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const GET_ALL_PACKING_LISTS_OF_USER = gql`
        query($userId: String!) {
            getAllPackingListsOfUser(userId: $userId) {
                _id
                owner {
                    _id
                }
                name
                description
                collaborators {
                    _id
                }
            }
        }
    `;
    
    const [
        getAllPackingListsOfUser_query, {
            data: getAllPackingListsOfUser_data,
            loading: getAllPackingListsOfUser_loading,
            error: getAllPackingListsOfUser_error
        }
    ] = useLazyQuery(GET_ALL_PACKING_LISTS_OF_USER, {
        fetchPolicy: 'cache-and-network' // this makes the new packing list immediately appear on the screen.
    });

    useEffect(() => {
        if (session && session.user) {
            getAllPackingListsOfUser_query({
                variables: { userId: session.user.id }
            });
        }
    }, [session]);

    const CREATE_PACKING_LIST = gql`
        mutation create_packing_list(
            $_id: String!
            $name: String!
            $description: String!
        ) {
            createPackingList(
                _id: $_id
                name: $name
                description: $description
            ) {
                _id
            }
        }
    `;

    const [createPackingList, {
        data: createPackingList_data,
        loading: createPackingList_loading,
        error: createPackingList_error
    }] = useMutation(CREATE_PACKING_LIST, {
        onCompleted: async (data) => {
            await refetch({query: { disableCookieCache: true }});
            router.push(`/list/${data.createPackingList._id}`);
        },
        onError: (error) => {
            console.log(JSON.stringify(error));
        }
    });

    const handleSubmit = async () => {
        try {
            await createPackingList({
                variables: {
                    _id: session.user.id,
                    name,
                    description
                }
            })
        } catch {

        }
    }

    if (isPending) { return <></> }
    if (!session) { return <></> }
    if (getAllPackingListsOfUser_data) {
        const {getAllPackingListsOfUser} = getAllPackingListsOfUser_data;
        return (
            <>

                <Modal opened={opened} onClose={close} title="Create New Packing List" centered>
                    {/* <Select
                        label="Start from scratch or use an existing template"
                        placeholder="Choose a template"
                        data={["Template1", "Template2"]}
                    /> */}
                    <TextInput
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        label="Name"
                        required
                        radius="md"
                    />
                    <TextInput
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        label="Description"
                        required
                        mt="md"
                        radius="md"
                    />
                    <Button
                        fullWidth
                        mt="xl"
                        radius="md"
                        onClick={handleSubmit}
                    >
                        Create packing list
                    </Button>
                </Modal>

                <Container m={0} size="lg" /* className="border-1 border-red-500" */>
                    <Group mt="lg">
                        <Button
                            color="green"
                            onClick={open}
                        >New Packing List</Button>
                        <Button color="yellow">New Template</Button>
                    </Group>
                    <SimpleGrid cols={{
                        base: 1, md: 3
                    }} mt="lg">
                        {getAllPackingListsOfUser.map((data) => (
                            <PackingListCard
                                key={data.name}
                                id={data._id}
                                name={data.name}
                                description={data.description}
                            />
                        ))}
                    </SimpleGrid>
                </Container>
            </>
        );
    } else if(getAllPackingListsOfUser_loading) {
        return <>Loading...</>
    } else if(getAllPackingListsOfUser_error) {
        console.log(JSON.stringify(getAllPackingListsOfUser_error))
        return <>ERROR</>
    }
}