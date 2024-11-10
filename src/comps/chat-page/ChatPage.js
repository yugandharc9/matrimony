import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Avatar, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

// Dummy chat data
const dummyMessages = [
  { id: 1, sender: 'John', text: 'Hi, how are you?', timestamp: '10:30 AM' },
  { id: 2, sender: 'You', text: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
  { id: 3, sender: 'John', text: 'I\'m doing great! Just working on a project.', timestamp: '10:34 AM' },
  { id: 4, sender: 'You', text: 'That\'s awesome! What kind of project?', timestamp: '10:35 AM' },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FEF5EC] p-4">
      <Paper className="flex-1 p-4" elevation={3} style={{ backgroundColor: '#492533' }}>
        <div className="flex items-center mb-4">
          <Avatar sx={{ bgcolor: '#F5D0A6' }}>J</Avatar>
          <Typography variant="h6" className="ml-4 text-[#F5D0A6]">John Doe</Typography>
        </div>

        <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((message) => (
            <div key={message.id}>
              <ListItem>
                <Avatar sx={{ bgcolor: '#CBAE8E' }} className="mr-2">{message.sender[0]}</Avatar>
                <ListItemText
                  primary={message.text}
                  secondary={`${message.sender} - ${message.timestamp}`}
                  primaryTypographyProps={{ className: "text-[#FEF5EC]" }}
                  secondaryTypographyProps={{ className: "text-[#CBAE8E]" }}
                />
              </ListItem>
              <Divider sx={{ backgroundColor: '#CBAE8E' }} />
            </div>
          ))}
        </List>
      </Paper>

      <div className="flex items-center mt-4">
        <TextField
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          InputProps={{
            style: { backgroundColor: '#CBAE8E', borderRadius: '25px' },
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatPage;
