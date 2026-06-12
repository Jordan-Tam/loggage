"use client";

import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
  IconX
} from '@tabler/icons-react';
import {
  Box,
  Image,
  Title,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
/* import { MantineLogo } from '@mantinex/mantine-logo'; */
import classes from './Navbar2.module.css';

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
  'Security',
  'Settings',
  'Dashboard',
  'Releases',
  'Account',
  'Orders',
  'Clients',
  'Databases',
  'Pull Requests',
  'Open Issues',
  'Wiki pages',
];

export default function Navbar({ toggle }) {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
        aria-label={link.label}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
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
          </div>
          {mainLinks}
        </div>
        {/* <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div> */}
      </div>
    </nav>
  );
}