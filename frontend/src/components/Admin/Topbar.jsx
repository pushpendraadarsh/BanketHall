import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";

import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Topbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    handleClose();
    navigate("/admin/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#111827",
        zIndex: 1201,
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>

        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              bgcolor: "#f3f4f6",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e5e7eb" }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={700}>
            Admin Dashboard
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={2}>

          <Typography
            variant="body2"
            sx={{ color: "#6b7280", display: { xs: "none", sm: "block" } }}
          >
            Welcome Admin
          </Typography>

          {/* PROFILE AVATAR */}
          <IconButton onClick={handleProfileClick}>
            <Avatar sx={{ bgcolor: "#3b82f6", width: 36, height: 36 }}>
              A
            </Avatar>
          </IconButton>

          {/* DROPDOWN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MenuItem disabled>
              👤 Admin Profile
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
              <Logout fontSize="small" style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;