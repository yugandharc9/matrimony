// src/components/BottomNavbar.jsx
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Search, Notifications, Message, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
//import { useChannel } from '../../hooks/PhoenixHook';
//import { useAuth } from '../auth/authctx';




const BottomBar2 = ({ active }) => {
  const [value, setValue] = useState(0);
  //const {token,userId} = useAuth();

  // const countReducer = (state, {event, payload}) => {
  //   switch (event) {
  //     case "publish":
  //     default: 
  //   } 
  // }

  // useChannel(`pub${userId}`,countReducer,{},token,userId);

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

      {
        active == "profiles" ?
          <BottomNavigationAction
            label="Profiles"
            icon={<Home />}
            component={Link}
            sx={{
                backgroundColor:  '#492533',
                color: '#CBAE8E',
              '&.Mui-selected': {
                backgroundColor: '#CBAE8E',
                color: '#492533',
              },
            }} /> :

          <BottomNavigationAction
            label="Profiles"
            icon={<Home />}
            to="/profiles"
            component={Link}
            sx={{
              backgroundColor: '#CBAE8E' , // background color
              color: '#492533' , // icon color
              '&.Mui-selected': {
                backgroundColor: '#492533',
                color: '#CBAE8E',
              },
            }} />
      }

      { 
      active == "saved" ? 
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        to="/search"
        sx={{
          backgroundColor: '#CBAE8E' ,
          color: '#492533',
          '&.Mui-selected': {
            color: '#CBAE8E',
            backgroundColor: '#492533',
          },
        }} /> 
        : 
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        to="/search"
        sx={{
          color: '#CBAE8E' ,
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }} />  
      }

      { 
      active == "chats" ? 
      <BottomNavigationAction
        label="Chats"
        icon={<Message />}
        component={Link}
        to="/chats"
        sx={{
          backgroundColor: '#CBAE8E' ,
          color: '#492533',
          '&.Mui-selected': {
            color: '#CBAE8E',
            backgroundColor: '#492533',
          },
        }} /> 
        : 
      <BottomNavigationAction
        label="Chats"
        icon={<Message />}
        component={Link}
        to="/chats"
        sx={{
          color: '#CBAE8E' ,
          backgroundColor: '#492533',
          '&.Mui-selected': {
            backgroundColor: '#CBAE8E',
            color: '#492533',
          },
        }} />  
      }

    </BottomNavigation>
  );
};

export default BottomBar2;
