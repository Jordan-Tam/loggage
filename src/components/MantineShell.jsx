"use client";

import {
    AppShell,
    Burger,
    Group
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "@/components/Navbar.jsx";

export default function MantineShell({ children }) {
    const [opened, { toggle }] = useDisclosure();
    return (
    <AppShell
        padding="md"
        /* header={{ height: 60 }} */
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
        }}
    >
        <AppShell.Navbar>
            <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell>
    )
}