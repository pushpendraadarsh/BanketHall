import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;
const collapsedWidth = 80;

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Bookings", icon: <BookIcon />, path: "/admin/bookings" },
    { text: "Halls", icon: <MeetingRoomIcon />, path: "/admin/halls" },
    { text: "Blog", icon: <MeetingRoomIcon />, path: "/admin/blogs" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          bgcolor: "#111827",
          color: "#fff",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      {/* PROFILE */}
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Avatar sx={{ mx: "auto", mb: 1 }}>A</Avatar>

        {!collapsed && (
          <Typography variant="body2">Admin</Typography>
        )}
      </Box>

      {/* MENU */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === "/admin"}
            sx={{
              color: "#fff",
              minHeight: 48,
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 0 : 2.5,

              "&.active": {
                bgcolor: "#1f2937",
                borderLeft: "4px solid #3b82f6",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: 0,
                mr: collapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>

            {!collapsed && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;