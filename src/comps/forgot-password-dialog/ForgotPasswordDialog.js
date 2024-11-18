import React, { useState } from 'react';
import { resetPassword } from '../../services/apiService';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import showNotification from '../notify/notify';

function ForgotPasswordDialog({ open, onClose }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (email == ""){
      showNotification("danger","","Email is required",2000)
      return  
    }
    try {
      const response = await resetPassword({ reset_password: { email: email } });
      if (response.status == 200) {
        showNotification("success", "", "Reset password link sent",3000)
      }
    } catch (e) {
      if (e.response.status == 422){  
      showNotification("danger","","No user found for "+ email,2000)
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Email Address"
            placeholder='Enter registered email'
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Send Reset Link
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
