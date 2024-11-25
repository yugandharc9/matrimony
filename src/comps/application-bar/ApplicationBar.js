import { AppBar, Toolbar } from "@mui/material"
import { HorrizontalLogo } from '../logo/logo'
import { Box, IconButton, Typography, Avatar, MenuItem, Menu } from '@mui/material'
import { useState } from "react";
import { useAuth } from "../auth/authctx";
import { useNavigate } from "react-router-dom";

const ApplicationBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = true;
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const {removeToken} = useAuth();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const userProfile = {
        name: "Yugandhar Chaudhari",
        picture: ""
    }

    return (
        <>
            <AppBar position="sticky" >
                <Toolbar className="bg-custom-c1 border-custom-c3 shadow-lg shadow-custom-c3">
                    <HorrizontalLogo />
                    {isLoggedIn ? (
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
                                <MenuItem onClick={handleMenuClose}>
                                    <Typography>Edit Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <Typography>Upload pics</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <Typography>Download my biodata</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <Typography>Delete my account</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate("/logout");
                                        handleMenuClose();
                                    }}
                                >
                                    <Typography>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Typography>
                            <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                Login
                            </a>
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </>
    ) 

}

export default ApplicationBar;