// src/components/ProfileBottomBar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Message,
  TurnedIn,
  ArrowDownward,
  NotInterested,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  getBioDataOfProfile,
  isThisProfileBlocked,
  blockChatRequest,
  unblockChatRequest,
  saveProfile,
  createChatRequest,
} from '../../services/apiService';
import { ConfirmDialog } from '../dialog/ConfirmDialog';
import showNotification from '../notify/notify';

const bottomBarButtonStyle = {
  color: '#492533',
  backgroundColor: '#CBAE8E',
  '&.Mui-selected': {
    backgroundColor: '#fff',
    color: '#492533 ',
  },
};

const ProfileBottomBar = ({ token, userId, userData, bottomBarStatus }) => {
  const [value, setValue] = useState(0);
  const confirmDialogRef = useRef();
  const currentDialogFunction = useRef('');
  const [confirmDialogText, setConfirmDialogText] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getBlockedStatus = async () => {
    try {
      const resp = await isThisProfileBlocked(token, userId);
      setIsBlocked(resp.data.is_blocked);
    } catch (e) {
      console.log('error getBlockedStatus', e);
    }
  };

  useEffect(() => {
    getBlockedStatus();
  }, []);

  const handleBioDownload = async () => {
    try {
      const resp = await getBioDataOfProfile(token, userId);
      let fileUrl = resp.data.url;
      console.log('fileUrl', fileUrl);
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${userData.name}_${userData.lastName}.pdf`; // Set your custom file name here

      // Trigger the download
      link.click();
      showNotification('success', '', 'Biodata download successfully', 2000);
    } catch (e) {
      console.log('error download biodata', e);
      showNotification('danger', '', 'Biodata download failed', 2000);
    }
  };

  const blockUser = async () => {
    try {
      const resp = await blockChatRequest(token, userId);
      showNotification('success', '', 'Block user successfully', 2000);
    } catch (error) {
      console.log('error download biodata', error);
      showNotification('danger', '', 'Block user failed', 2000);
    }
  };

  const unblockUser = async () => {
    try {
      const resp = await unblockChatRequest(token, userId);
      showNotification('success', '', 'Unblock user successfully', 2000);
    } catch (error) {
      console.log('error download biodata', error);
      showNotification('danger', '', 'Unblock user failed', 2000);
    }
  };

  const handleBlockUser = () => {
    if (isBlocked) {
      // already blocked need to unblock
      unblockUser();
      return;
    } else {
      // block user
      blockUser();
    }
  };

  const handleSaveProfile = async () => {
    try {
      const resp = await saveProfile(token, userId);
      showNotification('success', '', 'Profile saved successfully', 2000);
    } catch (error) {
      console.log('error save profile', error);
      showNotification('danger', '', 'Profile save failed', 2000);
    }
  };

  const handleSendChatRequest = async () => {
    try {
      const resp = await createChatRequest(token, userId);
      showNotification('success', '', 'Chat request sent successfully', 2000);
    } catch (error) {
      console.log('error send chat request', error);
      showNotification('danger', '', 'Chat request failed', 2000);
    }
  };

  const onConfirmedDialog = () => {
    if (currentDialogFunction.current === 'saveProfile') {
      handleSaveProfile();
    } else if (currentDialogFunction.current === 'sendChatRequest') {
      handleSendChatRequest();
    }
  };

  const openConfirmDialog = (text) => {
    setConfirmDialogText(text);
    confirmDialogRef.current.openDialog();
  };

  return (
    <div className='flex justify-center'>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={onConfirmedDialog}
        message={confirmDialogText}
      />
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
        {bottomBarStatus?.is_chat_requested === false && (
          <BottomNavigationAction
            label='Chat'
            icon={<Message />}
            component={Link}
            to='#'
            sx={{ borderRadius: '10px 0px 0px 10px', ...bottomBarButtonStyle }}
            onClick={() => {
              openConfirmDialog('Do you want to send chat request?');
              currentDialogFunction.current = 'sendChatRequest';
            }}
          />
        )}
        {bottomBarStatus?.is_bookmarked === false && (
          <BottomNavigationAction
            label='Save'
            icon={<TurnedIn />}
            component={Link}
            to='#'
            sx={{
              borderRadius: `${
                bottomBarStatus?.is_chat_requested === true
                  ? '10px 0px 0px 10px'
                  : ''
              }`,
              ...bottomBarButtonStyle,
            }}
            onClick={() => {
              openConfirmDialog('Do you want to save?');
              currentDialogFunction.current = 'saveProfile';
            }}
          />
        )}
        <BottomNavigationAction
          label='Download'
          icon={<ArrowDownward />}
          component={Link}
          to='#'
          sx={{
            borderRadius: `${
              bottomBarStatus?.is_bookmarked === true &&
              bottomBarStatus?.is_chat_requested === true &&
              !isBlocked
                ? '10px'
                : bottomBarStatus?.is_bookmarked === true &&
                  bottomBarStatus?.is_chat_requested === true
                ? '10px 0px 0px 10px'
                : !isBlocked
                ? '0px 10px 10px 0px'
                : ''
            }`,

            ...bottomBarButtonStyle,
          }}
          onClick={handleBioDownload}
        />
        {isBlocked && (
          <BottomNavigationAction
            label='Block'
            icon={<NotInterested />}
            component={Link}
            to='#'
            sx={{ borderRadius: '0px 10px 10px 0px', ...bottomBarButtonStyle }}
            onClick={handleBlockUser}
          />
        )}
      </BottomNavigation>
    </div>
  );
};

export default ProfileBottomBar;


