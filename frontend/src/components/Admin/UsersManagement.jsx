// components/Admin/UsersManagement.jsx
import React, { useState, useEffect } from 'react';
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
  Block, CheckCircle, Search, Refresh
} from '@mui/icons-material';
import { useBooking } from '../../context/BookingContext';
import Sidebar from './Sidebar';
import LoadingSpinner from '../Common/LoadingSpinner';

const UsersManagement = () => {
  const { users, fetchUsers, updateUserRole, deleteUser, loading, error } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, [pagination.page, roleFilter]);

  const loadUsers = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      role: roleFilter || undefined,
      search: searchTerm || undefined
    };
    const result = await fetchUsers(params);
    if (result?.pagination) {
      setPagination(prev => ({
        ...prev,
        total: result.pagination.totalItems,
        totalPages: result.pagination.totalPages
      }));
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    loadUsers();
  };

  const handleRoleChange = async () => {
    if (selectedUser && newRole) {
      const result = await updateUserRole(selectedUser._id, newRole);
      if (result.success) {
        setRoleDialogOpen(false);
        await loadUsers();
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? All their bookings will also be deleted.')) {
      const result = await deleteUser(userId);
      if (result.success) {
        await loadUsers();
      }
    }
  };

  const getRoleChip = (role) => {
    if (role === 'admin') {
      return <Chip icon={<AdminPanelSettings />} label="Admin" color="primary" size="small" />;
    }
    return <Chip icon={<Person />} label="User" color="default" size="small" />;
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>Manage Users</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
            {error}
          </Alert>
        )}
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Search Users"
                placeholder="Name, email, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Role Filter</InputLabel>
                <Select
                  value={roleFilter}
                  label="Role Filter"
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="user">Users</MenuItem>
                  <MenuItem value="admin">Admins</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                startIcon={<Search />}
              >
                Search
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={loadUsers}
                startIcon={<Refresh />}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Users Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Joined Date</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="textSecondary">No users found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2 }}>
                          {user.name?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {user._id.slice(-6)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {user.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getRoleChip(user.role)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                        icon={<CheckCircle />}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Change Role">
                          <IconButton
                            onClick={() => {
                              setSelectedUser(user);
                              setNewRole(user.role);
                              setRoleDialogOpen(true);
                            }}
                            size="small"
                            color="primary"
                          >
                            <AdminPanelSettings />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton
                            onClick={() => handleDeleteUser(user._id)}
                            color="error"
                            size="small"
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
        
        {pagination.totalPages > 1 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={(e, value) => setPagination({ ...pagination, page: value })}
              color="primary"
            />
          </Box>
        )}
        
        {/* Change Role Dialog */}
        <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              User: <strong>{selectedUser?.name}</strong>
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Role</InputLabel>
              <Select
                value={newRole}
                label="New Role"
                onChange={(e) => setNewRole(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRoleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRoleChange} variant="contained" color="primary">
              Update Role
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UsersManagement;