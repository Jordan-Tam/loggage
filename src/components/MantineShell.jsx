"use client";

import { usePathname } from "next/navigation";
import {
    AppShell,
    Burger
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "@/components/Navbar.jsx";

export default function MantineShell({ children }) {
    const pathname = usePathname();
    const [opened, { toggle }] = useDisclosure();
    const hideNavbar = ["/", "/login", "/signup"].includes(pathname);
    return (
    <AppShell
        /* padding="md" */
        /* header={{ height: 60 }} */
        navbar={
            hideNavbar
            ?
            undefined
            :
            {
                width: 80,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }
        }
    >

        {!hideNavbar && <AppShell.Header>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" m="md"/>
        </AppShell.Header> }
        
        {!hideNavbar && <AppShell.Navbar withBorder={false}>
            <Navbar toggle={toggle}/>
        </AppShell.Navbar> }

        <AppShell.Main
            mt={hideNavbar ? 0 : {base: 90, sm: 0}}
            mb={20}
        >
            {children}
        </AppShell.Main>

    </AppShell>
    )
}