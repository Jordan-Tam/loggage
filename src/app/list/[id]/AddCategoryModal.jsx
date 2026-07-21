"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
    Button,
    Modal,
    Text,
    TextInput
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AddCategoryModal() {
    return (
        <Modal title="Add New Category" centered>
            <TextInput
                /* value={name} */
                /* onChange={} */
                label="Name"
                required
                radius="md"
            />
            <Button fullWidth mt="xl" radius="md" onClick={() => {}}>
                Add category
            </Button>
        </Modal>
    )
}