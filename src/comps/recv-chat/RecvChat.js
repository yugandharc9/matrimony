import React from 'react';
import { Card, CardContent, CardHeader, Typography, Button, Grid, Box } from '@mui/material';

// Dummy data for received chat requests
const receivedRequests = [
  { id: 1, title: "John Doe", message: "Hey, I'd like to chat with you.", receivedTime: "1 hour ago" },
  { id: 2, title: "Jane Smith", message: "Your profile is interesting, let's talk!", receivedTime: "2 hours ago" },
  { id: 3, title: "Robert Brown", message: "I think we have a lot in common!", receivedTime: "3 hours ago" },
];

const ReceivedChatRequestsPage = () => {
  return (
    <div className="p-4 bg-[#FEF5EC]">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#492533' }}>
        Received Chat Requests
      </Typography>
      
      <Grid container spacing={4}>
        {receivedRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#CBAE8E' }}>
              <CardHeader
                title={request.title}
                subheader={request.receivedTime}
                sx={{ color: '#492533' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#492533' }}>
                  {request.message}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#F5D0A6',
                    color: '#492533',
                    '&:hover': { backgroundColor: '#CBAE8E' },
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginLeft: 2,
                    color: '#492533',
                    borderColor: '#492533',
                    '&:hover': { borderColor: '#CBAE8E' },
                  }}
                >
                  Decline
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ReceivedChatRequestsPage;
