import { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import {
    IconBell,
    IconCheckupList,
    IconHome2,
    IconListSearch,
    IconLogout,
    IconMicroscope,
    IconSettings,
    IconSwitchHorizontal,
    IconUser,
    IconUsersGroup,
    IconX,
} from '@tabler/icons-react';
import {
    Box,
    Center,
    Image,
    Stack,
    Tooltip,
    UnstyledButton
} from '@mantine/core';
import classes from './Navbar.module.css';
import { authClient } from '@/lib/auth-client';
import { router } from 'better-auth/api';

function NavbarLink({ icon: Icon, label, active, onClick }) {

    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton
            onClick={onClick}
            className={classes.link}
            data-active={active || undefined}
            aria-label={label}
        >
            <Icon size={20} stroke={1.5} />
        </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', url: "/home" },
    { icon: IconCheckupList, label: 'My Packing Lists and Templates', url: "/lists" },
    { icon: IconListSearch, label: 'Browse Templates', url: "/browse" },
    { icon: IconUsersGroup, label: "Friends", url: "/friends" },
    { icon: IconUser, label: 'Account', url: "/account" },
    { icon: IconSettings, label: 'Settings', url: "/settings" },
    { icon: IconMicroscope, label: 'Testing Page', url: "/test" }
];

export default function Navbar({ toggle }) {

    const pathname = usePathname();
    const router = useRouter();

    //const [active, setActive] = useState(-1); // set to -1 when opening a list

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={pathname === link.url}
            onClick={() => {
                //setActive(index);
                //redirect(link.url);
                router.push(link.url);
            }}
        />
    ));

    return (
        <nav className={classes.navbar}>
        <Center>
            {/* <MantineLogo type="mark" size={30} /> */}
            <Image
                src="/trip.svg"
                h={45}
                fit="contain"
                visibleFrom="sm"
            />
            <Box className="flex justify-center align-center" hiddenFrom="sm" p={0} m={0}>
                <IconX stroke={2} size={45} onClick={toggle}/>
            </Box>
        </Center>

        <div className={classes.navbarMain}>
            <Stack justify="center" gap={0}>
            {links}
            </Stack>
        </div>

        <Stack justify="center" gap={0}>
            <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
            <NavbarLink icon={IconBell} label="Notifications" />
            <NavbarLink
                icon={IconLogout}
                label="Logout"
                onClick={async () => {
                    const { data, error } = await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                //redirect("/login");
                                router.push("/login");
                                router.refresh();
                            }
                        }
                    })
                }}
            />
        </Stack>
        </nav>
    );
    }