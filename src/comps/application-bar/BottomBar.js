// src/components/BottomNavbar.jsx
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Search, Notifications, Message, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BottomBar = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      showLabels
      sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#492533', }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        sx={{
            color: value === 0 ? '#FFFFFF' : '#492533',
            '&.Mui-selected': {
              color: '#FFFFFF',
            },
          }}
        to="/home"
      />
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        to="/search"
        sx={{
            color: value === 0 ? '#FFFFFF' : '#492533',
            '&.Mui-selected': {
              color: '#FFFFFF',
            },
          }}
      />
      <BottomNavigationAction
        label="Notifications"
        icon={<Notifications />}
        component={Link}
        to="/notifications"
        sx={{
            color: value === 0 ? '#FFFFFF' : '#492533',
            '&.Mui-selected': {
              color: '#FFFFFF',
            },
          }}
      />
      <BottomNavigationAction
        label="Messages"
        icon={<Message />}
        component={Link}
        to="/messages"
        sx={{
            color: value === 0 ? '#FFFFFF' : '#492533',
            '&.Mui-selected': {
              color: '#FFFFFF',
            },
          }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircle />}
        component={Link}
        to="/profile"
        sx={{
            color: value === 0 ? '#FFFFFF' : '#492533',
            '&.Mui-selected': {
              color: '#FFFFFF',
            },
          }}
      />
    </BottomNavigation>
  );
};



const BottomNavbar2 = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#492533', // BottomNavigation background color
        borderTop: '1px solid #ddd',
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        to="/home"
        sx={{
          backgroundColor: value === 0 ? '#CBAE8E' : 'transparent', // background color
          color: value === 0 ? '#492533' : '#CBAE8E', // icon color
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        to="/search"
        sx={{
          backgroundColor: value === 1 ? '#CBAE8E' : 'transparent',
          color: value === 1 ? '#492533' : '#CBAE8E',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label="Notifications"
        icon={<Notifications />}
        component={Link}
        to="/notifications"
        sx={{
          backgroundColor: value === 2 ? '#CBAE8E' : 'transparent',
          color: value === 2 ? '#492533' : '#CBAE8E',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label="Messages"
        icon={<Message />}
        component={Link}
        to="/messages"
        sx={{
          backgroundColor: value === 3 ? '#CBAE8E' : 'transparent',
          color: value === 3 ? '#492533' : '#CBAE8E',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircle />}
        component={Link}
        to="/profile"
        sx={{
          backgroundColor: value === 4 ? '#CBAE8E' : 'transparent',
          color: value === 4 ? '#492533' : '#CBAE8E',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar2;
