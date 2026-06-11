"use client";

import { useState } from "react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Title
} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import classes from './Splash.module.css';
import Navbar from "@/components/Navbar.jsx";

const userLinks = [
  { link: '#', label: 'Privacy & Security' },
  { link: '#', label: 'Account settings' },
  { link: '#', label: 'Support options' },
];

const mainLinks = [
  { link: '#', label: 'Book a demo' },
  { link: '#', label: 'Documentation' },
  { link: '#', label: 'Community' },
  { link: '#', label: 'Academy' },
  { link: '#', label: 'Forums' },
];

export default function Splash() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <>
    {/* <Navbar/> */}
    <header className={classes.header}>
      <Container className={classes.inner2}>
        {/* <MantineLogo size={34} /> */}
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
        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{secondaryItems}</Group>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {mainLinks.map((item) => (
            <a
              href={item.link}
              key={item.label}
              className={classes.drawerLink}
              onClick={(event) => event.preventDefault()}
            >
              {item.label}
            </a>
          ))}
          <Divider my="sm" />
          {userLinks.map((item) => (
            <a
              href={item.link}
              key={item.label}
              className={classes.drawerLink}
              onClick={(event) => event.preventDefault()}
            >
              {item.label}
            </a>
          ))}
        </ScrollArea>
      </Drawer>
    </header>
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                fully featured
              </Text>{' '}
              React components library
            </Title>

            <Text className={classes.description} mt={30}>
              Build fully functional accessible web applications with ease – Mantine includes more
              than 100 customizable components and hooks to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
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