"use client";

import {
    Box,
    Button,
    Flex,
    Group,
    Menu,
    Select,
    Stack,
    Text,
    TextInput
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

const inlineEditingStyles = {
    h2: {
        fontSize: 'var(--mantine-h2-font-size)',
        fontWeight: 'var(--mantine-h2-font-weight)',
        lineHeight: 'var(--mantine-h2-line-height)',
        color: 'var(--mantine-color-text)',
        width: '100%',
        height: '100%'
    },
    standard: {
        fontSize: 'var(--mantine-text-font-size)',
        fontWeight: 'var(--mantine-text-font-weight)',
        lineHeight: 'var(--mantine-line-height)',
        color: 'var(--mantine-color-text)',
        width: '100%',
        height: '100%',
        textAlign: "center"
    }
}

export default function ItemCard({
    itemName
}) {
    return (
        <Box p="md" bd="1px solid red" bdrs="lg" mb="md">
            <Flex gap="md" align="stretch">
                <Stack flex={1}>
                    <Group justify="space-between">
                        <TextInput
                            value={itemName}
                            variant="unstyled"
                            styles={{ input: inlineEditingStyles.h2 }}
                        />
                        <Menu>
                            <Menu.Target>
                                <Button variant="white">
                                    <IconDotsVertical stroke={2} />
                                </Button>
                            </Menu.Target>
                        </Menu>
                    </Group>
                    <Group gap="5px">
                        <Text>Quantity:</Text>
                        <TextInput
                            value={null}
                            onChange={(e) => {
                                // set(e.currentTarget.value.replace(/[^0-9]/g, ''))
                            }}
                            maxLength={5}
                            size="sm"
                            w="70px"
                            mr="sm"
                            styles={{ input: inlineEditingStyles.standard }}
                        />
                        <Text>Weight:</Text>
                        <TextInput
                            value={null}
                            onChange={(e) => {
                                // set(e.currentTarget.value.replace(/[^0-9]/g, ''))
                            }}
                            maxLength={5}
                            size="sm"
                            w="70px"
                            mr="sm"
                            styles={{ input: inlineEditingStyles.standard }}
                        />
                        <Select
                            data={["lb", "kg"]}
                            size="sm"
                            w="60px"
                        />
                        <Select
                            data={["each", "total"]}
                            size="sm"
                            w="80px"
                            mr="sm"
                        />
                        <Text>Owner:</Text>
                        <Select
                            data={["Mark", "Penelope", "Peter"]}
                            size="sm"
                            mr="sm"
                        />
                        <Text>Bag:</Text>
                        <Select
                            data={["Purse", "Backpack"]}
                            size="sm"
                        />
                    </Group>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </Stack>
                <Box bd="1px solid blue" w="10%" bg="blue.1"></Box>
            </Flex>
        </Box>
    )    
}