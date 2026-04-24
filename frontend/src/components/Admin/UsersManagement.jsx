// components/Admin/UsersManagement.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  TextField, Button, Grid, Alert, Pagination, Chip,
  Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select,
  MenuItem, Tooltip, Stack
} from '@mui/material';

import {
  Delete, AdminPanelSettings, Person,
  CheckCircle, Search, Refresh
} from '@mui/icons-material';

const UsersManagement = () => {
  // ✅ DUMMY DATA (2 users)
  const [users, setUsers] = useState([
    {
      _id: "u1",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      role: "user",
      createdAt: new Date(),
    },
    {
      _id: "u2",
      name: "Admin User",
      email: "admin@example.com",
      phone: "9999999999",
      role: "admin",
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // 🔍 search filter (frontend only)
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = roleFilter ? user.role === roleFilter : true;

    return matchSearch && matchRole;
  });

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  const handleRoleChange = () => {
    setUsers(users.map((u) =>
      u._id === selectedUser._id ? { ...u, role: newRole } : u
    ));
    setRoleDialogOpen(false);
  };

  const getRoleChip = (role) => {
    if (role === 'admin') {
      return <Chip icon={<AdminPanelSettings />} label="Admin" color="primary" size="small" />;
    }
    return <Chip icon={<Person />} label="User" color="default" size="small" />;
  };

  return (
    <Box>

      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <Search />
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button fullWidth variant="outlined" startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('');
              }}
            >
              Reset
            </Button>
          </Grid>

        </Grid>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id} hover>

                  {/* User */}
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">
                          {user.name}
                        </Typography>
                        <Typography variant="caption">
                          {user._id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <Typography>{user.email}</Typography>
                    <Typography variant="caption">
                      {user.phone}
                    </Typography>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    {getRoleChip(user.role)}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label="Active"
                      color="success"
                      icon={<CheckCircle />}
                      size="small"
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">

                      <Tooltip title="Change Role">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedUser(user);
                            setNewRole(user.role);
                            setRoleDialogOpen(true);
                          }}
                        >
                          <AdminPanelSettings />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>

                    </Stack>
                  </TableCell>

                </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>

      {/* Role Dialog */}
      <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
        <DialogTitle>Change Role</DialogTitle>

        <DialogContent>
          <Typography>
            User: <b>{selectedUser?.name}</b>
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newRole}
              label="Role"
              onChange={(e) => setNewRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRoleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleRoleChange}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default UsersManagement;