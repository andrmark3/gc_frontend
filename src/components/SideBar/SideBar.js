import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Collapse, ListItemIcon } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@material-ui/icons/Event'; // Import EventIcon

const SideBar = ({ isLoggedIn, handleLogout }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [openProfileOptions, setOpenProfileOptions] = useState(false);

  const handleProfileOptionsToggle = () => {
    setOpenProfileOptions(!openProfileOptions);
  };

  const handleDisconnect = () => {
    handleLogout();
    setOpenProfileOptions(false);
  };

 
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 200, // Adjust width for mobile screens
        display: isTablet ? 'none' : 'show',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 210, // Adjust width for mobile screens
          boxSizing: 'border-box',
          padding: 3,
          backgroundColor: '#eeeeee',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)', // Added shadow styles
        },
      }}
    >
      <Link to="/events">
        <img src="GC_Logo.png" alt="Logo" className="logo" style={{ width: '170px' }} />
      </Link>

      <Divider sx={{ my: 2 }} /> {/* Add padding and margin to the divider */}

      <List>
        {/* Profile List item */}
        <ListItem button sx={{ borderRadius: 2 }} onClick={handleProfileOptionsToggle}>
          <ListItemIcon >
            {isLoggedIn ? <AccountCircleIcon /> : <ExitToAppIcon />} {/* AccountCircleIcon and Login Icons */}
          </ListItemIcon>
          {isLoggedIn ? <ListItemText primary="Profile" /> : <ListItemText primary="Sign In" onClick={() => {window.location.href = '/login'}} />}
          {isLoggedIn && openProfileOptions ? <ExpandLessIcon /> : isLoggedIn ? <ExpandMoreIcon /> : null}
        </ListItem>

        <Collapse in={openProfileOptions && isLoggedIn} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 2 }}>
            <ListItem button component={Link} to="/profile" sx={{ borderRadius: 2 }}>
              <ListItemIcon >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button component={Link} to="/login" sx={{ borderRadius: 2 }} onClick={handleDisconnect}>
              <ListItemIcon >
                <ExitToAppIcon sx={{ transform: 'rotate(180deg)' }} /> {/* Logout Icon */}
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Collapse>

        {/* Events List item */}
        <ListItem button component={Link} to="/events" sx={{ borderRadius: 2 }}>
          <ListItemIcon >
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
