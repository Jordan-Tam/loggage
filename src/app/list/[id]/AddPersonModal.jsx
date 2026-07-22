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

export default function AddPersonModal({ opened, close }) {

    const [name, setName] = useState("");

    const ADD_PACKING_LIST_PERSON = gql``;

    const [addPackingListPerson, {
        data: addPackingListPerson_data,
        loading: addPackingListPerson_loading,
        error: addPackingListPerson_error
    }] = useMutation(ADD_PACKING_LIST_PERSON, {
        onCompleted: async () => {},
        onError: (error) => { console.log(JSON.stringify(error)) }
    });

    const handleSubmit = async () => {
        try {
            await addPackingListPerson({
                variables: {

                }
            })
        } catch {
            
        }
    }

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
                Add person
            </Button>
        </Modal>
    )
}