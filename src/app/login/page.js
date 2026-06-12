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

export default function Login() {

  const {
    data: session,
    isPending
  } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  const handleLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/home"
    });
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
        style={styles.title}>
        Welcome back!
      </Title>

      <Text style={styles.subtitle}>
        Don't have an account yet? <Anchor component={Link} href="/signup">Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Email"
          placeholder="you@mantine.dev"
          required
          radius="md"
        />
        {/* <TextInput
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          label="Username"
          placeholder=""
          required
          radius="md"
        /> */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
        />
        {/* <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group> */}
        <Button fullWidth mt="xl" radius="md" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}