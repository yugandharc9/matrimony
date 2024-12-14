// src/components/ProfileBottomBar.jsx
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Message,
  TurnedIn,
  ArrowDownward,
  NotInterested,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProfileBottomBar = ({ active }) => {
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
        label='Chats'
        icon={<Message />}
        component={Link}
        to='#'
        sx={{
          color: '#CBAE8E',
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />

      <BottomNavigationAction
        label='Save'
        icon={<TurnedIn />}
        component={Link}
        to='#'
        sx={{
          color: '#CBAE8E',
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label='Down'
        icon={<ArrowDownward />}
        component={Link}
        to='#'
        sx={{
          color: '#CBAE8E',
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
      <BottomNavigationAction
        label='Block'
        icon={<NotInterested />}
        component={Link}
        to='#'
        sx={{
          color: '#CBAE8E',
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }}
      />
    </BottomNavigation>
  );
};

export default ProfileBottomBar;
