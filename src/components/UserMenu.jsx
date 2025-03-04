import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    handleMenuClose();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <div className='w-full flex justify-end px-6 mb-7'>
      {loggedInUser && (
        <>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={handleMenuOpen}
          >
            <Avatar sx={{ bgcolor: 'blue', marginRight: 1,fontSize:"14px" }}>{getInitials(loggedInUser)}</Avatar>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default UserMenu;
