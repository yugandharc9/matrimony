import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import ApplicationBar from '../application-bar/ApplicationBar';
import { subscriptionFeatures } from '../../constants/constants';
import {
  getAllPlansDetails,
  createOrder,
  capturePayment,
} from '../../services/apiService';
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { useMyProfileData } from '../my-profile-data/myprofilectx';

const SubscriptionsPage = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [planValidity, setPlanValidity] = useState('');
  const { myProfileData, updateProfileData } = useMyProfileData();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      updateProfileData();
    }
  }, [token]);

  useEffect(() => {
    if (myProfileData) {
      const expiryDate = new Date(myProfileData.paid);
      const currentDate = new Date();
      const diffTime = expiryDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setPlanValidity(diffDays);
    }
  }, [myProfileData]);

  const initiatePayment = async (planTitle, amount) => {
    try {
      const response = await createOrder(token, amount);
      if (response.data) {
        initiateRazorPay(planTitle, amount, response.data);
      }
    } catch (error) {
      console.error('Error in payment:', error);
      showNotification('danger', '', 'Something went wrong', 2000);
    }
  };

  // Callbacks for initiating Razorpay payment
  const initiateRazorPay = (planTitle, amount, orderDetails) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay Key
      amount: amount.toString(), // Amount in paise
      currency: 'INR',
      description: `${planTitle} subscription`,
      order_id: orderDetails.id, // when testing in local environment, comment this line
      handler: function (response) {
        // On successful payment
        showNotification('success', '', 'Payment was successful', 2000);
        savePaymentDetails(response.razorpay_payment_id, amount);
      },
      theme: {
        color: '#4e8ef7',
      },
      modal: {
        ondismiss: function () {
          showNotification(
            'warning',
            '',
            'Payment process was cancelled',
            2000
          );
        },
      },
    };

    try {
      const Razorpay = window.Razorpay;
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      showNotification('danger', '', 'Something went wrong', 2000);
    }
  };

  const getSubscriptionPlans = async () => {
    try {
      const response = await getAllPlansDetails();
      setSubscriptionData(response.data.plans);
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    }
  };

  const savePaymentDetails = async (payment_id, amount) => {
    try {
      const response = await capturePayment(token, payment_id, amount);

      updateProfileData();
    } catch (error) {
      console.error('Error in saving payment:', error);
      showNotification('danger', '', 'Something went wrong', 2000);
    }
  };

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  const formatCurrency = (amount) => {
    return `₹${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <div className='h-screen bg-custom-c1 overflow-auto'>
      <ApplicationBar />
      {/* current subscription plan */}
      <div className='flex flex-col items-center gap-5 mx-5 my-10'>
        <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
          Subscriptions
        </h1>
        <hr className='w-full h-2 border-custom-c2' />

        <div className='flex justify-center w-full gap-10'>
          <div className='flex flex-col'>
            <span className='font-semibold text-[#fff] text-left'>
              Current Plan:
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='flex-1 text-[#fff] text-left'>
              {myProfileData?.current_plan} Plan{' '}
              {planValidity !== '' ? `(Expires in ${planValidity} days)` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* purchase plan */}
      <div className='flex flex-col items-center gap-5 mx-5 my-10'>
        <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
          Purchase Subscriptions
        </h1>
        <hr className='w-full h-2 border-custom-c2' />
        <div>
          <h1 className='text-[#fff] text-lg font-semibold'>Features:</h1>
          <List>
            {subscriptionFeatures.map((feature, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#fff',
                      }}
                    >
                      <CheckCircle sx={{ color: '#fff', marginRight: 1 }} />
                      {feature}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className='grid gap-5 mb-20'>
          {subscriptionData.length > 0 &&
            subscriptionData.map((plan, index) => (
              <IconButton
                key={index}
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: '#492533', //492533
                  color: '#fff',
                  '&:hover': { backgroundColor: '#492533' },
                  border: '1px solid #fff',
                  marginTop: 2,
                  padding: '10px 20px',
                  borderRadius: '20px',
                }}
                onClick={() =>
                  initiatePayment(plan.duration, plan.cost_in_paise)
                }
              >
                For {plan.duration} at {formatCurrency(plan.cost_in_rupee)}
                {plan?.saving_percentage && plan?.saving_percentage !== ''
                  ? ` (${plan.saving_percentage} saving)`
                  : ''}
              </IconButton>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;


