"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { authClient } from "@/lib/auth-client";

import {
    Accordion,
    Box,
    Button,
    Collapse,
    Container,
    Divider,
    Flex,
    Group,
    Menu,
    NumberInput,
    Select,
    Stack,
    Table,
    Tabs,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconDotsVertical
} from '@tabler/icons-react';

import ItemCard from "./ItemCard";
import AddCategoryModal from "./AddCategoryModal";
import AddBagModal from "./AddBagModal";
import AddPersonModal from "./AddPersonModal";

export default function List() {

    const { data: session, isPending, refetch } = authClient.useSession();

    const [owner, setOwner] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantityTest, setQuantityTest] = useState("");

    // After calling GET_PACKING_LIST_OF_USER, store the "categoryView" object here.
    // Every time the user makes changes, update this state.
    // Periodically autosave by passing this state to the edit packing list mutation.
    const [categoryView, setCategoryView] = useState(null);


    // Modal states.
    const [addBagModal_opened, { addBagModal_open, addBagModal_close }] = useDisclosure(false);
    const [addCategoryModal_opened, { addCategoryModal_open, addCategoryModal_close }] = useDisclosure(false);
    const [addPersonModal_opened, { addPersonModal_open, addPersonModal_close }] = useDisclosure(false);

    const params = useParams();

    const router = useRouter();

    const GET_PACKING_LIST_OF_USER = gql`
        query($userId: String!, $listId: String!) {
            getPackingListOfUser(userId: $userId, listId: $listId) {
                _id
                owner {
                    _id
                    username
                }
                name
                description
                bags {
                    name
                    type
                    notes
                    belongsTo {
                        _id
                        username
                    }
                }
                categoryView {
                    category
                    items {
                        name
                        category
                        bag {
                            name
                        }
                        quantity
                        weight
                        individualOrTotal
                        notes
                        # belongsTo {
                            # _id
                            # username
                        # }
                    }
                }
            }
        }
    `;

    const [
        getPackingListOfUser_query, {
            data: getPackingListOfUser_data,
            loading: getPackingListOfUser_loading,
            error: getPackingListOfUser_error
        }
    ] = useLazyQuery(GET_PACKING_LIST_OF_USER);

    useEffect(() => {
        if (session && session.user && params) {
            getPackingListOfUser_query({
                variables: { userId: session.user.id, listId: params.id }
            })
        }
    }, [session, params]);

    useEffect(() => {
        if (getPackingListOfUser_data) {
            setName(getPackingListOfUser_data.getPackingListOfUser.name);
            setDescription(getPackingListOfUser_data.getPackingListOfUser.description);
        }
    }, [getPackingListOfUser_data]);

    if (isPending) { return <></> }
    if (!session) { return <></> }
    if (getPackingListOfUser_data) {
        const {getPackingListOfUser} = getPackingListOfUser_data;
        return (
            <>
                
                <AddCategoryModal
                    opened={addCategoryModal_opened}
                    close={addCategoryModal_close}
                />

                <AddBagModal
                    opened={addBagModal_opened}
                    close={addBagModal_close}
                />
        
                <AddPersonModal
                    opened={addPersonModal_opened}
                    close={addPersonModal_close}
                />

                <Container ml={20} size="xl">
                    <Stack mt="xl" gap="lg" /* bd="1px solid var(--mantine-color-gray-3)" */>
                        <TextInput
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            variant="unstyled"
                            styles={{
                                input: {
                                    fontSize: 'var(--mantine-h1-font-size)',
                                    fontWeight: 'var(--mantine-h1-font-weight)',
                                    lineHeight: 'var(--mantine-h1-line-height)',
                                    color: 'var(--mantine-color-text)',
                                    width: '100%',
                                    height: '100%'
                                }
                            }}
                        />
                        <TextInput /* CHANGE THIS TO A TEXT AREA */
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            variant="unstyled"
                            styles={{
                                input: {
                                    fontSize: "var(--mantine-font-size-lg)",
                                    color: "var(--mantine-color-dimmed)",
                                    width: "100%",
                                    height: "100%"
                                }
                            }}
                        />
                        {/* <Text size="lg" c="dimmed">{getPackingListOfUser.description}</Text> */}
                        <Box m={0}>
                            <Table style={{ tableLayout: 'auto', width: 'auto' }} withRowBorders={false}>
                                <Table.Tbody m={0}>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="sm" fw="bold">Owner</Text>
                                        </Table.Td>
                                        <Table.Td>{getPackingListOfUser.owner.username}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td pr={50}>
                                            <Text size="sm" fw="bold">People</Text>
                                        </Table.Td>
                                        <Table.Td>1</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="sm" fw="bold">Start Date</Text>
                                        </Table.Td>
                                        <Table.Td>N/A</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="sm" fw="bold">End Date</Text>
                                        </Table.Td>
                                        <Table.Td>N/A</Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Box>
                        <Group mb="xl">
                            <Button onClick={addCategoryModal_open}>Add Category</Button>
                            <Button onClick={addBagModal_open}>Add Bag</Button>
                            <Button onClick={addPersonModal_open}>Add Person</Button>
                        </Group>
                        <Tabs variant="outline" defaultValue="category">
                            <Tabs.List /* className="border-1 border-red-500" */>
                                <Tabs.Tab value="category">
                                    <Title order={3}>Category View</Title>
                                </Tabs.Tab>
                                <Tabs.Tab value="bag">
                                    <Title order={3}>Bag View</Title>
                                </Tabs.Tab>
                                <Tabs.Tab value="people">
                                    <Title order={3}>People View</Title>
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="category" /* className="border-1 border-red-500" */>
                                <Container m={0} mt="lg" size="xl">
                                    {/* <Title order={2} mb="md">Food</Title> */}
                                    <Group>
                                        <TextInput
                                            value="Food"
                                            variant="unstyled"
                                            size={Math.max("Food".length, 1)}
                                            styles={{
                                                input: {
                                                    fontSize: 'var(--mantine-h1-font-size)',
                                                    fontWeight: 'var(--mantine-h1-font-weight)',
                                                    lineHeight: 'var(--mantine-h1-line-height)',
                                                    color: 'var(--mantine-color-text)',
                                                    width: '100%',
                                                    height: '100%'
                                                }
                                            }}
                                            mb="md"
                                        />
                                        {/* <Menu>
                                            <Menu.Target>
                                                <Button></Button>
                                            </Menu.Target>
                                        </Menu> */}
                                    </Group>
                                    <Box p="md" bd="1px solid red" bdrs="lg" mb="md">
                                        <Flex gap="md" align="stretch">
                                            <Stack /* bd="1px solid green" */ flex={1}>
                                            <Group justify="space-between">
                                                <TextInput
                                                    value="Potato Chips"
                                                    /* value={name}
                                                    onChange={(e) => setName(e.currentTarget.value)} */
                                                    variant="unstyled"
                                                    styles={{
                                                        input: {
                                                            fontSize: 'var(--mantine-h2-font-size)',
                                                            fontWeight: 'var(--mantine-h2-font-weight)',
                                                            lineHeight: 'var(--mantine-h2-line-height)',
                                                            color: 'var(--mantine-color-text)',
                                                            width: '100%',
                                                            height: '100%'
                                                        }
                                                    }}
                                                />
                                                <Menu>
                                                    <Menu.Target>
                                                        <Button variant="white">
                                                            <IconDotsVertical stroke={2}/>
                                                        </Button>
                                                    </Menu.Target>
                                                </Menu>
                                            </Group>
                                                <Group gap="5px">
                                                    <Text>
                                                        Quantity:
                                                    </Text>
                                                    <TextInput
                                                        value={quantityTest}
                                                        /* variant="unstyled" */
                                                        onChange={(e) => {
                                                            setQuantityTest(e.currentTarget.value.replace(/[^0-9]/g, ''))
                                                        }}
                                                        maxLength={5}
                                                        /* radius="xs" */
                                                        size="sm"
                                                        w="70px"
                                                        mr="sm"
                                                        /* className="border-1 border-red-500" */
                                                        styles={{
                                                            input: {
                                                                fontSize: 'var(--mantine-text-font-size)',
                                                                fontWeight: 'var(--mantine-text-font-weight)',
                                                                lineHeight: 'var(--mantine-line-height)',
                                                                color: 'var(--mantine-color-text)',
                                                                width: '100%',
                                                                height: '100%',
                                                                textAlign: "center"
                                                            }
                                                        }}
                                                    />
                                                    <Text>Weight:</Text>
                                                    <TextInput
                                                        value={quantityTest}
                                                        /* variant="unstyled" */
                                                        onChange={(e) => {
                                                            setQuantityTest(e.currentTarget.value.replace(/[^0-9]/g, ''))
                                                        }}
                                                        maxLength={5}
                                                        /* radius="xs" */
                                                        size="sm"
                                                        w="70px"
                                                        /* className="border-1 border-red-500" */
                                                        styles={{
                                                            input: {
                                                                fontSize: 'var(--mantine-text-font-size)',
                                                                fontWeight: 'var(--mantine-text-font-weight)',
                                                                lineHeight: 'var(--mantine-line-height)',
                                                                color: 'var(--mantine-color-text)',
                                                                width: '100%',
                                                                height: '100%',
                                                                textAlign: "center"
                                                            }
                                                        }}
                                                    />
                                                    <Select
                                                        data={["lb", "kg"]}
                                                        size="sm"
                                                        w="60px"
                                                        styles={{
                                                            input: {

                                                            }
                                                        }}
                                                    />
                                                    <Select
                                                        data={["each", "total"]}
                                                        size="sm"
                                                        w="80px"
                                                        mr="sm"
                                                        styles={{
                                                            input: {

                                                            }
                                                        }}
                                                    />
                                                    <Text>Owner:</Text>
                                                    <Select
                                                        data={["Mark", "Penelope", "Peter"]}
                                                        size="sm"
                                                        mr="sm"
                                                        styles={{
                                                            input: {

                                                            }
                                                        }}
                                                    />
                                                    <Text>Bag:</Text>
                                                    <Select
                                                        data={["Purse", "Backpack"]}
                                                        size="sm"
                                                        styles={{
                                                            input: {

                                                            }
                                                        }}
                                                    />
                                                </Group>
                                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                                            </Stack>
                                            <Box bd="1px solid blue" w="10%" bg="blue.1"></Box>
                                        </Flex>
                                    </Box>
                                </Container>
                            </Tabs.Panel>

                            <Tabs.Panel value="bag">
                                Bag content
                            </Tabs.Panel>

                            <Tabs.Panel value="people">
                                People content
                            </Tabs.Panel>
                        </Tabs>
                    </Stack>
                </Container>
            </>
        );
        return (
            <>
            {getPackingListOfUser.categoryView.map((categoryViewEntry) => {
                <Group>
                    <TextInput
                        value={categoryViewEntry.category}
                        variant="unstyled"
                        styles={{
                            input: {
                                fontSize: 'var(--mantine-h1-font-size)',
                                fontWeight: 'var(--mantine-h1-font-weight)',
                                lineHeight: 'var(--mantine-h1-line-height)',
                                color: 'var(--mantine-color-text)',
                                width: '100%',
                                height: '100%'
                            }
                        }}
                        mb="md"
                    />
                    <Menu>
                        <Menu.Target>
                            <Button></Button>
                        </Menu.Target>
                        {/* Edit and delete buttons */}
                    </Menu>
                </Group>
                {categoryViewEntry.items.map((item) => {
                    <ItemCard />
                })}
            })}
            </>
        )
    } else if (getPackingListOfUser_loading) {
        return <></>
    } else if (getPackingListOfUser_error) {
        console.log(JSON.stringify(getPackingListOfUser_error))
        return <></>
    }
}