"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {
    Button,
    Modal,
    Text,
    TextInput
} from "@mantine/core";

export default function AddCategoryModal({ opened, close }) {

    const [name, setName] = useState("");

    const ADD_PACKING_LIST_CATEGORY = gql``;

    const [addPackingListCategory, {
        data: addPackingListCategory_data,
        loading: addPackingListCategory_loading,
        error: addPackingListCategory_error
    }] = useMutation(ADD_PACKING_LIST_CATEGORY, {
        onCompleted: async () => {},
        onError: (error) => { console.log(JSON.stringify(error)) }
    });

    const handleSubmit = async () => {
        try {
            await addPackingListCategory({
                variables: {

                }
            })
        } catch {

        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Add New Category" centered>
            <TextInput
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
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