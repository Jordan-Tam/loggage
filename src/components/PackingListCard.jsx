"use client";

import {
    Anchor,
    Box,
    Button,
    Card,
    Flex,
    Text
} from "@mantine/core";
import {
    IconDotsVertical,
    IconEdit,
    IconSpeakerphone,
    IconTemplate,
    IconUserPlus
} from '@tabler/icons-react';

export default function PackingListCard({ id, name, description, color }) {
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