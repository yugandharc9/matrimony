import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Markunread, Delete } from '@mui/icons-material';

// Dummy notification data
const initialNotifications = [
  {
    id: 1,
    message: "Your subscription will expire in 3 days.",
    isRead: false,
  },
  {
    id: 2,
    message: "You have a new message from John Doe.",
    isRead: true,
  },
  {
    id: 3,
    message: "Your profile has been viewed by someone.",
    isRead: false,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#FEF5EC' }}>
      {/* Header Section */}
      <Typography variant="h4" sx={{ color: '#492533', marginBottom: 3 }}>
        Notifications
      </Typography>

      {/* Notification List */}
      <List>
        {notifications.map((notification) => (
          <Box key={notification.id} sx={{ backgroundColor: '#CBAE8E', borderRadius: 2, marginBottom: 2 }}>
            <ListItem>
              <ListItemText
                primary={notification.message}
                sx={{
                  color: notification.isRead ? '#A5A5A5' : '#492533', // grey out read notifications
                }}
              />
              <IconButton
                onClick={() => markAsRead(notification.id)}
                disabled={notification.isRead}
                sx={{
                  color: notification.isRead ? '#A5A5A5' : '#492533',
                  marginRight: 1,
                }}
              >
                <Markunread />
              </IconButton>
              <IconButton onClick={() => deleteNotification(notification.id)} sx={{ color: '#492533' }}>
                <Delete />
              </IconButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default NotificationPage;
