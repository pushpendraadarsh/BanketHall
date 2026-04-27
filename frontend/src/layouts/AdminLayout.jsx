import React, { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

const drawerWidth = 40;
const collapsedWidth = 72;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
      />

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: {
            md: collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
          },
          transition: "margin 0.3s ease",
          bgcolor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >

        {/* TOPBAR */}
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onMenuClick={handleDrawerToggle}
          isMobile={isMobile}
        />

        {/* CONTENT */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* spacer for fixed topbar */}
          <Toolbar />

          <Box
            sx={{
              maxWidth: "1400px",
              mx: "auto",
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default AdminLayout;