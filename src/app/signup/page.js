"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Outfit } from 'next/font/google';
import { authClient } from "@/lib/auth-client";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

const outfitFont = Outfit({
    subsets: ["latin"]
})

const styles = {
    title: {
        /* fontFamily: "var(--mantine-font-family)", */
        fontWeight: 600
    },

    subtitle: {
        color: "var(--mantine-color-dimmed)",
        fontSize: "var(--mantine-font-size-sm)",
        textAlign: "center",
        marginTop: "5px"
    }
}

export default function Signup() {

    const {
        data: session,
        isPending
    } = authClient.useSession();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorHidden, setErrorHidden] = useState(true);

    const handleSignUp = async () => {
        const { data, error } = await authClient.signUp.email({
            email,
            username,
            password,
            name: username
        }, {
            onRequest: (ctx) => {
                setDisabled(true);
                setErrorHidden(true);
            },
            onSuccess: (ctx) => {
                redirect("/home");
            },
            onError: (ctx) => {
                setErrorMessage(JSON.stringify(ctx.error));
                setErrorHidden(false);
                setDisabled(false);
            }
        })
    }

    if (isPending) {
        return <></>
    }

    if (session) {
        redirect("/home");
    }

    return (
        <Container size={420} my={40}>
            <Title
                ta="center"
                className={outfitFont.className}
                style={styles.title}
            >
                Sign Up
            </Title>

        <Text style={styles.subtitle}>
            Already have an account? <Anchor component={Link} href="/login">Log in</Anchor>
        </Text>

        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <Text hidden={errorHidden} className="text-red-500" mb="md">{errorMessage}</Text>
            <TextInput
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                label="Email"
                placeholder="Enter email"
                required
                radius="md"
                disabled={disabled}
            />
            <TextInput
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                label="Username"
                placeholder="Enter username"
                required
                mt="md"
                radius="md"
                disabled={disabled}
            />
            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                label="Password"
                placeholder="Enter password"
                required
                mt="md"
                radius="md"
                disabled={disabled}
            />
            <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                label="Confirm password"
                placeholder="Retype password"
                required
                mt="md"
                radius="md"
                disabled={disabled}
            />
            {/* <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
            </Group> */}
            <Button
                fullWidth mt="xl"
                radius="md"
                onClick={handleSignUp}
                disabled={disabled}
            >
                Create account
            </Button>
        </Paper>
        </Container>
    );
}