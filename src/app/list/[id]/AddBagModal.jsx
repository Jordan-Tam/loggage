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

export default function AddBagModal({ opened, close }) {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [notes, setNotes] = useState("");
    const [belongsTo, setBelongsTo] = useState("");

    const ADD_PACKING_LIST_BAG = gql``;

    const GET_PLACEHOLDERS = gql``;

    const [addPackingListBag, {
        data: addPackingListBag_data,
        loading: addPackingListBag_loading,
        error: addPackingListBag_error
    }] = useMutation(ADD_PACKING_LIST_BAG, {
        update: (cache, {data: {addPlaceholder}}) => {
            const {placeholders} = cache.readQuery({
                query: GET_PLACEHOLDERS
            });
            cache.writeQuery({
                query: GET_PLACEHOLDERS,
                data: {placeholders: [...placeholders, addPlaceholder]}
            });
        },
        onCompleted: async () => {},
        onError: (error) => { console.log(JSON.stringify(error))}
    });

    const handleSubmit = async () => {
        try {
            await addPackingListBag({
                variables: {

                }
            })
        } catch {

        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Add New Bag" centered>
            <TextInput
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                label="Name"
                required
                radius="md"
            />
            <Button fullWidth mt="xl" radius="md" onClick={() => {}}>
                Add bag
            </Button>
        </Modal>
    )
}