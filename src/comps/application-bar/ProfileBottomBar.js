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

const bottomBarButtonStyle = {
  color: '#492533',
  backgroundColor: '#CBAE8E',
  '&.Mui-selected': {
    backgroundColor: '#fff',
    color: '#492533 ',
  },
};

const ProfileBottomBar = ({ active }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='flex justify-center'>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          backgroundColor: '#492533',
          border: '1px solid #492533',
          borderRadius: '10px',
        }}
        className='fixed bottom-20 border w-full md:w-[38%] '
      >
        <BottomNavigationAction
          label='Chats'
          icon={<Message />}
          component={Link}
          to='#'
          sx={{ borderRadius: '10px 0px 0px 10px', ...bottomBarButtonStyle }}
        />

        <BottomNavigationAction
          label='Save'
          icon={<TurnedIn />}
          component={Link}
          to='#'
          sx={bottomBarButtonStyle}
        />
        <BottomNavigationAction
          label='Down'
          icon={<ArrowDownward />}
          component={Link}
          to='#'
          sx={bottomBarButtonStyle}
        />
        <BottomNavigationAction
          label='Block'
          icon={<NotInterested />}
          component={Link}
          to='#'
          sx={{ borderRadius: '0px 10px 10px 0px', ...bottomBarButtonStyle }}
        />
      </BottomNavigation>
    </div>
  );
};

export default ProfileBottomBar;


