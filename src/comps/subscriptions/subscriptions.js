import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

// Dummy data for subscriptions
const subscriptionData = [
  {
    title: "3 months Plan",
    price: "₹550",
    duration: "3 months",
    features: [
      "Direct message to all profiles",
      "Unlimited profile visits",
      "All the features of the app",
      "Access for three months"
    ],
    amount: 55000, // Amount in smallest currency unit (paise for INR)
  },
  {
    title: "6 months Plan",
    price: "₹950",
    duration: "6 months",
    features: [
      "Direct message to all profiles",
      "Unlimited profile visits",
      "All the features of the app",
      "Access for six months"
    ],
    amount: 95000,
  },
  {
    title: "12 months Plan",
    price: "₹1350",
    duration: "1 year",
    features: [
      "Direct message to all profiles",
      "Unlimited profile visits",
      "All the features of the app",
      "Access for one year"
    ],
    amount: 135000,
  },
];

// Callbacks for initiating Razorpay payment
const initiatePayment = (planTitle, amount, onPaymentSuccess) => {
  const options = {
    key: 'razorpay_key_here', // Your Razorpay Key
    amount: amount.toString(), // Amount in paise
    currency: 'INR',
    description: `${planTitle} subscription`,
    handler: function (response) {
      // On successful payment
      onPaymentSuccess(response.razorpay_payment_id);
    },
    theme: {
      color: '#4e8ef7',
    },
  };

  try {
    const Razorpay = window.Razorpay;
    const rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (error) {
    alert("Error initializing Razorpay: " + error.message);
  }
};

// Callback for successful payment
const handlePaymentSuccess = (paymentId, planTitle) => {
  // You can make an API call here to save the payment details on your server
  alert(`Payment successful for ${planTitle}! Payment ID: ${paymentId}`);
};

const SubscriptionsPage = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#FEF5EC' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 3 }}>
        <Typography variant="h4" sx={{ color: '#492533' }}>
          Subscriptions
        </Typography>
        <IconButton href="/account">
          <Typography variant="body1" sx={{ color: '#492533' }}>
            Back
          </Typography>
        </IconButton>
      </Box>

      {/* Current Plan Section */}
      <Typography variant="h6" sx={{ color: '#492533', marginBottom: 2 }}>
        You have subscribed to:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Current Plan"
            secondary="3 months Plan (Expires in 15 days)"
            sx={{ color: '#492533' }}
          />
        </ListItem>
        <Divider />
      </List>

      {/* Available Plans Section */}
      <Typography variant="h6" sx={{ color: '#492533', marginBottom: 2, marginTop: 4 }}>
        Purchase Subscriptions
      </Typography>

      {subscriptionData.map((plan, index) => (
        <Box key={index} sx={{ marginBottom: 2, backgroundColor: '#CBAE8E', borderRadius: 2 }}>
          <List>
            <ListItem>
              <ListItemText
                primary={plan.title}
                secondary={<Typography variant="body2" sx={{ color: '#492533' }}>{plan.duration}</Typography>}
                sx={{ color: '#492533' }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={`Price: ${plan.price}`}
                sx={{ color: '#492533' }}
              />
            </ListItem>
            <Divider />
            {plan.features.map((feature, featureIndex) => (
              <ListItem key={featureIndex}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#492533' }}>
                      <CheckCircle sx={{ color: '#492533', marginRight: 1 }} />
                      {feature}
                    </Box>
                  }
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#F5D0A6',
                    color: '#492533',
                    '&:hover': { backgroundColor: '#CBAE8E' },
                  }}
                  onClick={() => initiatePayment(plan.title, plan.amount, (paymentId) => handlePaymentSuccess(paymentId, plan.title))}
                >
                  Purchase Plan
                </IconButton>
              </Box>
            </ListItem>
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default SubscriptionsPage;

