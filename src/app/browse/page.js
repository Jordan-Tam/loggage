"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client/react";
import {
    Anchor,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Group,
    SimpleGrid,
    Text,
    TextInput
} from "@mantine/core";
import {
    IconDotsVertical,
    IconEdit,
    IconSpeakerphone,
    IconTemplate,
    IconUserPlus
} from '@tabler/icons-react';

import PackingListCard from "@/components/PackingListCard";

export default function Browse() {
    return (
        <>
            <p>Browse</p>
        </>
    )
}