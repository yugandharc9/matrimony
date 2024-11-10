import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';

// Dummy data for sent chat requests
const sentRequests = [
  { id: 1, title: "John Doe", message: "Hey, let's chat!", sentTime: "2 hours ago", status: "Pending" },
  { id: 2, title: "Jane Smith", message: "Looking forward to talking!", sentTime: "4 hours ago", status: "Accepted" },
  { id: 3, title: "Robert Brown", message: "How about a chat sometime?", sentTime: "6 hours ago", status: "Pending" },
];

const SentChatRequestsPage = () => {
  return (
    <div className="p-4 bg-[#FEF5EC]">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#492533' }}>
        Sent Chat Requests
      </Typography>
      
      <Grid container spacing={4}>
        {sentRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#CBAE8E' }}>
              <CardHeader
                title={request.title}
                subheader={`Sent ${request.sentTime}`}
                sx={{ color: '#492533' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#492533' }}>
                  {request.message}
                </Typography>
                <Typography variant="body2" sx={{ color: '#492533', marginTop: 1 }}>
                  Status: {request.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SentChatRequestsPage;
