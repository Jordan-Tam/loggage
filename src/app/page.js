"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import heroClasses from './Hero.module.css';
import headerClasses from './Header.module.css';

const mockdata = [
  {
    icon: IconCode,
    title: 'Feature 1',
    description: 'Feature 1 description',
  },
  {
    icon: IconCoin,
    title: 'Feature 2',
    description: 'Feature 2 description',
  },
  {
    icon: IconBook,
    title: 'Feature 3',
    description: 'Feature 3 description',
  },
  {
    icon: IconFingerprint,
    title: 'Feature 4',
    description: 'Feature 4 description',
  },
  {
    icon: IconChartPie3,
    title: 'Feature 5',
    description: 'Feature 5 description',
  },
  {
    icon: IconNotification,
    title: 'Feature 6',
    description: 'Feature 6 description',
  },
];

export default function Home() {

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={headerClasses.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>

    {/* Header section */}

    <Box /* pb={120} */>
      <header className={headerClasses.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}>
            <img src="/trip.svg" width="50px"></img>
            <span style={{
              fontWeight: "bold"
            }}>Loggage</span>
          </div>

          <Group h="100%" gap={0} visibleFrom="sm">

            {/* Home */}
            <Link href="/" className={headerClasses.link}>
              Home
            </Link>

            {/* Features */}
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={headerClasses.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={headerClasses.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Get started
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            {/* About */}
            <a href="#" className={headerClasses.link}>
              About
            </a>
          </Group>

          {/* Login and register buttons */}
          <Group visibleFrom="sm">
            <Button variant="default" component={Link} href="/login">
              Log in
            </Button>
            <Button component={Link} href="/signup">
              Sign up
            </Button>
          </Group>

          {/* Burger button that shows up on smaller screens */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </header>

      {/* Drawer component that opens when pressing the burger button and contains all the header stuff that gets removed on smaller screens. */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={headerClasses.link}>
            Home
          </a>
          <UnstyledButton className={headerClasses.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse expanded={linksOpened}>{links}</Collapse>
          <a href="#" className={headerClasses.link}>
            Learn
          </a>
          <a href="#" className={headerClasses.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component={Link} href="/login">
              Log in
            </Button>
            <Button component={Link} href="/signup">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>

    {/* Hero section */}
    <div className={`${heroClasses.root}`}>
      <Container size="lg">
        <div className={heroClasses.inner}>
          <div className={heroClasses.content}>
            <Title className={heroClasses.title}>
              The free and collaborative tool to help keep track of everything you bring on vacation
              {/* A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                fully featured
              </Text>{' '}
              React components library */}
            </Title>

            <Text className={heroClasses.description} mt={30}>
              Create packing lists, categorize belongings and assign them to specific individuals and bags, track the current status of items, and record the history of item usage.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={heroClasses.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}