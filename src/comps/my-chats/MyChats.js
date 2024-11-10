import React from 'react';
import { Card, CardContent, CardHeader, Typography, Button, Grid, Box } from '@mui/material';

// Dummy data for chats
const myChats = [
  { id: 1, title: "Chat with John Doe", message: "Hey, how's it going?", lastMessageTime: "5 minutes ago" },
  { id: 2, title: "Chat with Jane Smith", message: "I loved your profile!", lastMessageTime: "10 minutes ago" },
  { id: 3, title: "Chat with Robert Brown", message: "Let's meet tomorrow.", lastMessageTime: "1 hour ago" },
];

const MyChatsPage = () => {
  return (
    <div className="p-4 bg-[#FEF5EC]">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#492533' }}>
        My Chats
      </Typography>
      
      <Grid container spacing={4}>
        {myChats.map((chat) => (
          <Grid item xs={12} sm={6} md={4} key={chat.id}>
            <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#CBAE8E' }}>
              <CardHeader
                title={chat.title}
                subheader={chat.lastMessageTime}
                sx={{ color: '#492533' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#492533' }}>
                  {chat.message}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/chat/${chat.id}`}
                  sx={{
                    backgroundColor: '#F5D0A6',
                    color: '#492533',
                    '&:hover': { backgroundColor: '#CBAE8E' },
                  }}
                >
                  Open Chat
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyChatsPage;
