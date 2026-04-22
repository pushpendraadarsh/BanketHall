// components/Admin/BookingsManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  Select, MenuItem, FormControl, InputLabel, TextField,
  Button, Grid, Alert, Pagination, TableSortLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Card, CardContent, Stack, Tooltip, Avatar
} from '@mui/material';
import {
  Delete, Visibility, Refresh, FilterList,
  CheckCircle, Cancel, Pending, EventNote,
  Phone, Email, LocationOn, AccessTime
} from '@mui/icons-material';
import { useBooking } from '../../context/BookingContext';
import Sidebar from './Sidebar';
import LoadingSpinner from '../Common/LoadingSpinner';

const BookingsManagement = () => {
  const { bookings, fetchBookings, updateBookingStatus, deleteBooking, loading, error } = useBooking();
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    startDate: '',
    endDate: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    loadBookings();
  }, [pagination.page, filters.status, sortBy, sortOrder]);

  const loadBookings = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      status: filters.status || undefined,
      search: filters.search || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      sortBy,
      sortOrder
    };
    const result = await fetchBookings(params);
    if (result?.pagination) {
      setPagination(prev => ({
        ...prev,
        total: result.pagination.totalItems,
        totalPages: result.pagination.totalPages
      }));
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
      await updateBookingStatus(bookingId, newStatus);
      await loadBookings();
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      await deleteBooking(bookingId);
      await loadBookings();
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'warning', icon: <Pending />, label: 'Pending' },
      confirmed: { color: 'success', icon: <CheckCircle />, label: 'Confirmed' },
      cancelled: { color: 'error', icon: <Cancel />, label: 'Cancelled' },
      completed: { color: 'info', icon: <CheckCircle />, label: 'Completed' }
    };
    return configs[status] || configs.pending;
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>Manage Bookings</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
            {error}
          </Alert>
        )}
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                placeholder="User name or email"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={loadBookings}
                startIcon={<Refresh />}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Bookings Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'createdAt'}
                    direction={sortOrder}
                    onClick={() => handleSort('createdAt')}
                  >
                    Booking Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Hall</TableCell>
                <TableCell>Event Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography color="textSecondary">No bookings found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => {
                  const statusConfig = getStatusConfig(booking.status);
                  return (
                    <TableRow key={booking._id} hover>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{booking.userId?.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {booking.userId?.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{booking.hallId?.name}</TableCell>
                      <TableCell>
                        {new Date(booking.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {booking.startTime} - {booking.endTime}
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="bold">
                          ₹{booking.totalPrice?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={statusConfig.icon}
                          label={statusConfig.label}
                          color={statusConfig.color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                              size="small"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="confirmed">Confirm</MenuItem>
                              <MenuItem value="cancelled">Cancel</MenuItem>
                              <MenuItem value="completed">Complete</MenuItem>
                            </Select>
                          </FormControl>
                          <Tooltip title="View Details">
                            <IconButton
                              onClick={() => {
                                setSelectedBooking(booking);
                                setDetailsOpen(true);
                              }}
                              size="small"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(booking._id)}
                              color="error"
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
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
        
        {/* Booking Details Dialog */}
        <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
          {selectedBooking && (
            <>
              <DialogTitle>
                <Typography variant="h6">Booking Details</Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Customer Information
                        </Typography>
                        <Stack spacing={1}>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                              {selectedBooking.userId?.name?.charAt(0)}
                            </Avatar>
                            <Typography>{selectedBooking.userId?.name}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{selectedBooking.userId?.email}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{selectedBooking.userId?.phone}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Event Details
                        </Typography>
                        <Stack spacing={1}>
                          <Box display="flex" alignItems="center">
                            <MeetingRoom sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography>{selectedBooking.hallId?.name}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <EventNote sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography>{new Date(selectedBooking.date).toLocaleDateString()}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography>{selectedBooking.startTime} - {selectedBooking.endTime}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Payment Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Total Amount</Typography>
                            <Typography variant="h6">₹{selectedBooking.totalPrice?.toLocaleString()}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">Payment Status</Typography>
                            <Chip 
                              label={selectedBooking.paymentStatus || 'Pending'} 
                              size="small"
                              color={selectedBooking.paymentStatus === 'paid' ? 'success' : 'warning'}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {selectedBooking.specialRequests && (
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Special Requests
                          </Typography>
                          <Typography variant="body2">{selectedBooking.specialRequests}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Box>
  );
};

export default BookingsManagement;