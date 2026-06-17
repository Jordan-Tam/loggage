"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
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

const mockdata = [
    {
        name: "Business trip 1",
        description: "Work",
        color: "blue.5"
    },
    {
        name: "Business trip 2",
        description: "Work",
        color: "green.5"
    },
    {
        name: "Business trip 3",
        description: "Work",
        color: "black.5"
    },
];

function PackingListCard({ name, description, color }) {

    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section withBorder>
                <Box h={150} bg={color}></Box>
            </Card.Section>
            <Text mt="md" size="lg" fw={700}>{name}</Text>
            <Text mt={5} mb={15} size="sm" lineClamp={3}>{description}</Text>
            {/* <Group mt="auto" pl="sm" pr="sm" justify="center" align="center" wrap="nowrap"> */}
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
            {/* </Group> */}
        </Card>
    );
}

export default function Lists() {

    const { data: session, isPending } = authClient.useSession();

    const router = useRouter();

    const [opened, { open, close }] = useDisclosure(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const GET_ALL_PACKING_LISTS_OF_USER = gql`
        query($userId: String!) {
            getAllPackingListsOfUser(userId: $userId) {
                _id
                owner
                name
                description
                collaborators
            }
        }
    `;
    
    const {
        data: getAllPackingListsOfUser_data,
        loading: getAllPackingListsOfUser_loading,
        error: getAllPackingListsOfUser_error,
    } = useQuery(GET_ALL_PACKING_LISTS_OF_USER);

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
        onCompleted: (data) => {
            // console.log("ON COMPLETED");
            // console.log(data);
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
                        {mockdata.map((data) => (
                            <PackingListCard
                                key={data.name}
                                name={data.name}
                                description={data.description}
                                color={data.color}
                            />
                        ))}
                    </SimpleGrid>
                </Container>
            </>
        );
    } else if(true) {

    } else if(true) {

    }
}