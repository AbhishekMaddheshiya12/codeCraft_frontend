import React, { useState } from 'react';
import { 
  Box, Button, IconButton, Paper, Typography, Drawer, 
  List, ListItem, ListItemIcon, ListItemText, Divider, 
  useTheme, useMediaQuery, styled, alpha 
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Code as CodeIcon,
  Forum as DiscussIcon,
  Info as AboutUsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/auth';
import image from '../assets/Logo.png';

const GlassNav = styled(Paper)(({ theme }) => ({
  background: alpha("#0f172a", 0.7),
  backdropFilter: "blur(20px)",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 30px',
  borderRadius: 0,
  borderBottom: `1px solid ${alpha("#ffffff", 0.05)}`,
  backgroundImage: "none", 
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#94a3b8",
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '0.85rem',
  fontFamily: 'monospace',
  padding: '6px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: "#6366f1",
    background: alpha("#6366f1", 0.1),
    transform: 'translateY(-1px)'
  },
}));

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get('https://codecraft-sr3j.onrender.com/user/logout', { withCredentials: true });
      if (data.success) {
        dispatch(userExist(false));
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { text: 'PROBLEMS', icon: <CodeIcon fontSize="small" />, path: '/home' },
    { text: 'DISCUSS', icon: <DiscussIcon fontSize="small" />, path: '/discuss' },
    { text: 'ABOUT_US', icon: <AboutUsIcon fontSize="small" />, path: '/aboutUs' },
    { text: 'PROFILE', icon: <AccountCircleIcon fontSize="small" />, path: '/profile' },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      background: "#0f172a", 
      color: "#fff", 
      width: 250,
      pt: 2 
    }}>
      <Box sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <img src={image} alt="Logo" style={{ width: 30, height: 30 }} />
        <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1rem', letterSpacing: -1 }}>
          CODECRAFT <span style={{ color: "#6366f1" }}>OS</span>
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: alpha("#ffffff", 0.05) }} />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text}
            button 
            onClick={() => { navigate(item.path); setMobileOpen(false); }}
            sx={{ 
              mx: 1, borderRadius: '8px', mb: 0.5,
              '&:hover': { bgcolor: alpha("#6366f1", 0.1) } 
            }}
          >
            <ListItemIcon sx={{ color: '#6366f1', minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace' }} 
            />
          </ListItem>
        ))}
        <Divider sx={{ bgcolor: alpha("#ffffff", 0.05), my: 1 }} />
        <ListItem 
          button 
          onClick={handleLogOut}
          sx={{ mx: 1, borderRadius: '8px', '&:hover': { bgcolor: alpha("#ef4444", 0.1) } }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText 
            primary="LOGOUT" 
            primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace', color: '#ef4444' }} 
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1300 }}>
      <GlassNav elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={image} alt="Logo" style={{ width: 28, height: 28, marginRight: 12 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, 
              color: '#fff',
              letterSpacing: '-1px',
              fontSize: '1.1rem',
              display: { xs: 'block', md: 'block' }
            }}
          >
            CODECRAFT <span style={{ color: "#6366f1" }}>OS</span>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
          {navItems.map((item) => (
            <NavButton
              key={item.text}
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
            >
              {item.text}
            </NavButton>
          ))}
          
          <Box sx={{ height: 20, width: '1px', bgcolor: alpha("#ffffff", 0.1), mx: 1 }} />
          
          <IconButton
            onClick={handleLogOut}
            sx={{
              color: '#94a3b8',
              '&:hover': { color: '#ef4444', transform: 'scale(1.1)' },
              transition: 'all 0.2s ease'
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Mobile Toggle */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </GlassNav>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 250,
            background: 'none',
            border: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default NavBar;