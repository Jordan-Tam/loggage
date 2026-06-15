"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
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
            <Group mt="auto" pl="sm" pr="sm" justify="center" align="center" wrap="nowrap">
                <Button variant="white" color={color} style={{flexShrink: 0}}>
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
            </Group>
        </Card>
    );
}

export default function Lists() {

    const { data: session, isPending } = authClient.useSession();
    const [opened, { open, close }] = useDisclosure(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

    const handleSubmit = async () => {
        try {
            //await
        } catch {

        }
    }

    if (isPending) { return <></> }
    if (!session) { return <></> }
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
    )
}