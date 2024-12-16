import { AppBar, Toolbar } from '@mui/material';
import { HorrizontalLogo } from '../logo/logo';
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  MenuItem,
  Menu,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../auth/authctx';
import { useNavigate } from 'react-router-dom';

const ApplicationBar = () => {
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { isAuthenticated } = useAuth();

  const handleMenuClose = (navigationRoute) => {
    setAnchorEl(null);
    if (navigationRoute && typeof navigationRoute === 'string') {
      navigate(`/${navigationRoute}`);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const userProfile = {
    name: 'Yugandhar Chaudhari',
    picture: '',
  };

  return (
    <AppBar position='sticky'>
      <Toolbar
        className='bg-custom-c1 border-custom-c3 shadow-lg shadow-custom-c3'
        sx={{ justifyContent: 'space-between' }}
      >
        <HorrizontalLogo />

        {isAuthenticated ? (
          <Box>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                alt={userProfile.name}
                src={userProfile.picture}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ mt: 1 }} // Adds spacing between the avatar and dropdown
            >
              <MenuItem onClick={() => handleMenuClose('update/info')} key={1}>
                <Typography>Edit Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose('upload/pics')} key={2}>
                <Typography>Upload pics</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} key={3}>
                <Typography>Download my biodata</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} key={4}>
                <Typography>Delete my account</Typography>
              </MenuItem>
              <MenuItem
                key={5}
                onClick={() => {
                  navigate('/logout');
                  handleMenuClose();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Typography>
            <a href='/login' style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </a>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;


