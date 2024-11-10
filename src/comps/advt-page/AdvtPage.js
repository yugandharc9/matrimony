import React from 'react';
import { Paper, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';

// Dummy featured ads data
const featuredAds = [
  {
    id: 1,
    title: "Special Discount on Fashion Items",
    description: "Get 50% off on all fashion items! Limited time offer.",
    imageUrl: "https://via.placeholder.com/300x200?text=Fashion+Sale",
    link: "#",
  },
  {
    id: 2,
    title: "Exclusive Deal on Electronics",
    description: "Up to 30% off on the latest gadgets. Don’t miss out!",
    imageUrl: "https://via.placeholder.com/300x200?text=Electronics+Deal",
    link: "#",
  },
  {
    id: 3,
    title: "Book Your Dream Vacation Now",
    description: "Exclusive vacation packages starting from $299. Book today!",
    imageUrl: "https://via.placeholder.com/300x200?text=Vacation+Deal",
    link: "#",
  },
];

const FeaturedAdvertisingPage = () => {
  return (
    <div className="p-4 bg-[#FEF5EC]">
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#492533' }}>
        Featured Advertisements
      </Typography>
      
      <Grid container spacing={4}>
        {featuredAds.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#CBAE8E' }}>
              <CardMedia
                component="img"
                alt={ad.title}
                height="200"
                image={ad.imageUrl}
                sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: '#492533' }}>
                  {ad.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#492533', marginTop: 1 }}>
                  {ad.description}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={ad.link}
                  sx={{
                    backgroundColor: '#F5D0A6',
                    color: '#492533',
                    '&:hover': { backgroundColor: '#CBAE8E' },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturedAdvertisingPage;
