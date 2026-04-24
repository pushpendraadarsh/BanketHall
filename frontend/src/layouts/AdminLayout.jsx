import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

const drawerWidth = 60;
const collapsedWidth = 70;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
          transition: "all 0.3s ease",
          bgcolor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        {/* Topbar */}
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Toolbar />
          <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;