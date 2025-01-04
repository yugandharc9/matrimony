import ApplicationBar from '../application-bar/ApplicationBar';
import BottomBar2 from '../application-bar/BottomBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authctx';
import { useChannel } from '../../hooks/PhoenixHook';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  getChatForProfile,
  sendMessageToUser,
  isThisProfileBlocked,
  blockChatRequest,
  unblockChatRequest,
  reportUser,
} from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import { MoreVert, Send } from '@mui/icons-material';
import { Input } from '../input/input';
import BouncingLoader from '../bouncing-loader/BouncingLoader';
import moment from 'moment';
import showNotification from '../notify/notify';
import { ConfirmDialog } from '../dialog/ConfirmDialog';
import ReportUserDialog from '../report-user-dialog/ReportUserDialog';

const getChannelName = (userID1, userID2) => {
  if (userID1 < userID2) {
    return `chat${userID1}:${userID2}`;
  }
  return `chat${userID2}:${userID1}`;
};

const menuOptions = [
  { id: 'block', name: 'Block ' },
  { id: 'report', name: 'Report' },
];

export const UserChat = () => {
  const location = useLocation();
  const thread = location.state;
  const { token, userId } = useAuth();
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false); // typing animation
  const observerRef = useRef(null); // Ref for the observer
  const typingRef = useRef(null);
  const firstTimeLoading = useRef(true);
  const currentTypingRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [activityText, setActivityText] = useState('');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [heightOfBottomNav, setHeightOfBottomNav] = useState(55);
  const messageToSent = useRef();
  const [isBlocked, setIsBlocked] = useState(false);
  const confirmDialogRef = useRef();
  const [confirmDialogText, setConfirmDialogText] = useState('');
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const getBlockedStatus = async () => {
    try {
      const resp = await isThisProfileBlocked(token, thread.from_profile);
      setIsBlocked(resp.data.is_blocked);
    } catch (e) {
      console.log('error getBlockedStatus', e);
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

  const openConfirmDialog = () => {
    setConfirmDialogText(
      `Are you sure you want to ${isBlocked ? 'Unblock' : 'Block'} user`
    );
    confirmDialogRef.current.openDialog();
  };

  const blockUser = async () => {
    try {
      const resp = await blockChatRequest(token, thread.from_profile);
      showNotification('success', '', 'Block user successfully', 2000);
    } catch (error) {
      console.log('error block user', error);
      showNotification('danger', '', 'Block user failed', 2000);
    } finally {
      getBlockedStatus();
    }
  };

  const unblockUser = async () => {
    try {
      const resp = await unblockChatRequest(token, thread.from_profile);
      showNotification('success', '', 'Unblock user successfully', 2000);
    } catch (error) {
      console.log('error unblock user', error);
      showNotification('danger', '', 'Unblock user failed', 2000);
    } finally {
      getBlockedStatus();
    }
  };

  const scrollToBottom = (timeout = 500) => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant',
      });
    }, timeout);
  };

  const messageHandler = (state, { event, payload }) => {
    console.log('state', state);
    console.log('event', event);
    console.log('payload', payload);

    if (event == 'message') {
      if (payload.hasOwnProperty('typing')) {
        if (payload.userId != userId) {
          setTyping(payload.typing);
          scrollToBottom(100);
        }
      } else {
        let currentMsg = payload.message;
        setMessages([...messages, currentMsg]);
        scrollToBottom(200);
      }
    }
  };

  const [stateMsg, broadcast] = useChannel(
    getChannelName(thread.from_user, userId),
    messageHandler,
    [],
    token,
    userId
  );

  const handleBroadcastMessage = (sendMsg) => {
    broadcast('message', { message: sendMsg });
  };

  const updateLastOnline = (lastOnlineDateTime) => {
    const dateTime = moment(lastOnlineDateTime).add('+05:30').calendar();
    setActivityText(`Last seen ${dateTime}`);
  };

  const sendMsg = async () => {
    if (messageToSent.current.getVal().trim() === '') return;
    try {
      let currentMsg = messageToSent.current.getVal().trim();

      const response = await sendMessageToUser(
        token,
        thread.from_user,
        currentMsg
      );
      handleBroadcastMessage(response?.data?.data);
    } catch (e) {
      console.log('error is ', e);
      showNotification('danger', '', 'Failed to send message');
    } finally {
      messageToSent.current.setVal('');
      scrollToBottom();
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (optionId) => {
    setAnchorEl(null);
    if (optionId === 'block') {
      openConfirmDialog();
    } else if (optionId === 'report') {
      openReportDialogBox();
    }
  };

  useLayoutEffect(() => {
    const ele = document.getElementById('bottom-nav-id');
    const height = ele?.clientHeight;
    setHeightOfBottomNav(height);
  }, []);

  const broadcastTyping = (text) => {
    if (currentTypingRef.current == false) {
      broadcast('message', { typing: true, userId: userId });
      currentTypingRef.current = true;
    }

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      broadcast('message', { typing: false, userId: userId });
      currentTypingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    getBlockedStatus();
    getChat(true);
    incrementOffset(offset);
  }, []);

  const incrementOffset = (prev) => {
    setTimeout(() => {
      setOffset(prev + 8);
    }, 1000);
  };

  useEffect(() => {
    console.log('useEffect [offset, hasMore] start', offset, hasMore);
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
        if (entries[0].isIntersecting) {
          console.log('loading more', firstTimeLoading.current);
          if (!firstTimeLoading.current) {
            getChat();
          }
        }
      },
      { threshold: 0.5 } // Trigger when the element is at the top
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Cleanup
    };
  }, [offset, hasMore]);

  const getChat = async (isScrollToBottom = false) => {
    if (loading || (hasMore != null && !hasMore)) {
      console.log('returning due to loading');
      return;
    }
    try {
      setLoading(true);
      const response = await getChatForProfile(
        token,
        thread.from_profile,
        offset
      );

      updateLastOnline(response?.data?.last_online_at);
      setMessages([...response.data.data, ...messages]);

      setHasMore(response?.data?.total > offset);
      if (hasMore) {
        incrementOffset(offset);
      }
    } catch (e) {
      console.log('error is ', e);
    } finally {
      setLoading(false);
      if (isScrollToBottom) {
        scrollToBottom();
        setTimeout(() => {
          firstTimeLoading.current = false;
        }, 500);
      }
    }
  };

  const openReportDialogBox = () => {
    setOpenReportDialog(true);
  };

  const closeReportDialog = () => {
    setOpenReportDialog(false);
  };

  const submitReportUserDialog = async (reportText) => {
    try {
      const response = await reportUser(token, thread.from_profile, reportText);
      console.log('response', response);
      showNotification('success', '', 'Reported user successfully', 2000);
    } catch (e) {
      console.log('error is ', e);
      if (e.response.status === 409) {
        showNotification('danger', '', e.response.data.error, 2000);
      } else {
        showNotification('danger', '', 'Failed to report', 2000);
      }
    } finally {
      closeReportDialog();
    }
  };

  return (
    <>
      <div className='bg-custom-c1 h-full min-h-screen'>
        <ConfirmDialog
          ref={confirmDialogRef}
          onConfirm={handleBlockUser}
          message={confirmDialogText}
        />
        <ReportUserDialog
          open={openReportDialog}
          onClose={closeReportDialog}
          onSubmit={submitReportUserDialog}
        />
        <ApplicationBar />
        <div className='fixed w-full z-10'>
          <div className='flex flex-row h-16 bg-custom-c2 items-center'>
            <ArrowBackIosIcon
              sx={{ width: 'full', height: 'full', cursor: 'pointer', ml: 2 }}
              onClick={() => navigate('/chats')}
            />
            <div className='w-1/4 flex justify-center items-center'>
              <img
                className='rounded-full w-16 h-16 object-cover'
                src={thread.profile_pic}
                alt={`${thread.name} ${thread.last_name}`}
              />
            </div>

            <div className='flex flex-col w-3/4 md:w-2/4 px-4'>
              {/* Header Section */}
              <div className='flex items-center justify-between'>
                <div className='text-left'>
                  <div className='text-lg md:text-3xl text-custom-c1'>
                    {thread.name} {thread.last_name}{' '}
                    <span className='text-red-500 font-semibold'>
                      {isBlocked ? ' [Blocked]' : ''}
                    </span>
                  </div>
                  <div className='text-xs md:text-sm text-custom-c1'>
                    {activityText}
                  </div>
                </div>
                <div>
                  <IconButton
                    size='medium'
                    sx={{ color: 'black' }}
                    aria-label='more'
                    id='long-button'
                    aria-controls={menuOpen ? 'long-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={handleMenuClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                  >
                    {menuOptions.map((option) => (
                      <MenuItem
                        key={option.id}
                        onClick={() => handleMenuClose(option.id)}
                      >
                        {option.id === 'block' && isBlocked
                          ? 'Unblock'
                          : option.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-2xl mx-auto p-4 pb-[10rem] pt-[6rem]'>
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                margin: '20px 0px',
                color: '#f0d0a6',
              }}
            />
          )}

          <div className='space-y-4 '>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {index == 0 && hasMore && (
                  <div
                    ref={observerRef}
                    style={{ height: '80px', background: 'transparent' }}
                  />
                )}
                <div
                  className={`flex ${
                    message.to != userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-left ${
                      message.to != userId
                        ? 'bg-custom-c2 text-custom-c1'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {message.message}
                    <p className='text-right text-xs'>
                      {moment(message.inserted_at).add('+05:30').format('lll')}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
            {typing && (
              <div key={'typing'} className={`flex justify-start`}>
                <div
                  className={`max-w-xs p-3 rounded-lg text-left bg-gray-200 text-black`}
                >
                  <BouncingLoader />
                </div>
              </div>
            )}
          </div>
        </div>

        {!isBlocked && (
          <div className={`fixed bottom-[${heightOfBottomNav}px] w-full`}>
            <div className='flex items-center justify-center w-full '>
              <Input
                placeholder='Type your message...'
                ref={messageToSent}
                type='text'
                labelName=''
                styleProps={{
                  width: { xs: '75%', md: '50%' },
                  margin: '0px 10px',
                }}
                autoComplete='off'
                onChange={broadcastTyping}
              />

              <Button
                onClick={sendMsg}
                sx={{
                  border: '2px solid #f0d0a6',
                  color: '#492533',
                  textTransform: 'none',
                  '&:hover': {
                    border: '2px solid #f0d0a6',
                    color: '#492533',
                  },
                  background: '#f0d0a6',
                  margin: '20px 0px',
                  height: '50px',
                  minWidth: '50px',
                  padding: '0px',
                  borderRadius: '100%',
                }}
              >
                <Send sx={{ fontSize: '20px' }} />
              </Button>
            </div>
          </div>
        )}
        <BottomBar2 active='chats' />
      </div>
    </>
  );
};


