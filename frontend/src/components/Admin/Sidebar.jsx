// components/Admin/Sidebar.jsx
import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Divider, Avatar, Box,
  ListItemButton, useTheme
} from '@mui/material';
import {
  Dashboard, EventNote, MeetingRoom, People,
  ExitToApp, Assessment, Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Bookings', icon: <EventNote />, path: '/admin/bookings' },
    { text: 'Halls', icon: <MeetingRoom />, path: '/admin/halls' },
    { text: 'Users', icon: <People />, path: '/admin/users' },
    { text: 'Reports', icon: <Assessment />, path: '/admin/reports' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#1a1a1a',
          color: '#ffffff',
          borderRight: 'none',
          position: 'fixed',
          height: '100vh',
          top: 0,
          left: 0,
          overflowX: 'hidden'
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 2, minHeight: 'auto !important' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ 
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.25rem'
        }}>
          Banquet Admin
        </Typography>
      </Toolbar>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 2,
            bgcolor: '#1976d2',
            fontSize: 32,
            fontWeight: 'bold'
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'A'}
        </Avatar>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {user?.name || 'Admin User'}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
          {user?.email || 'admin@banquet.com'}
        </Typography>
      </Box>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      
      <List sx={{ mt: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                bgcolor: location.pathname === item.path ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? '#1976d2' : 'rgba(255,255,255,0.7)',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? '#1976d2' : 'rgba(255,255,255,0.9)',
                    fontSize: '0.9rem'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout} 
            sx={{ 
              mx: 1, 
              borderRadius: 2, 
              mb: 1,
              '&:hover': {
                bgcolor: 'rgba(244, 67, 54, 0.1)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              sx={{
                '& .MuiTypography-root': {
                  color: 'rgba(255,255,255,0.9)'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;