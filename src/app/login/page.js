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
import { Outfit } from 'next/font/google';

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
  return (
    <Container size={420} my={40}>
      <Title
        ta="center"
        className={outfitFont.className}
        style={styles.title}>
        Welcome back!
      </Title>

      <Text style={styles.subtitle} className="border-1 border-red-500">
        Do not have an account yet? <Anchor>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" radius="md">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}