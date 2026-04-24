import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  Select, MenuItem, FormControl, Button, Grid,
  Pagination, Stack, Tooltip, Avatar, Dialog,
  DialogTitle, DialogContent, DialogActions, Card,
  CardContent
} from '@mui/material';

import {
  Delete, Visibility, Refresh,
  CheckCircle, Cancel, Pending,
  EventNote, Phone, Email,
  AccessTime, MeetingRoom
} from '@mui/icons-material';

import Sidebar from './Sidebar';

// ✅ DUMMY DATA (IMPORTANT FIX)
const dummyBookings = [
  {
    _id: "1",
    createdAt: new Date(),
    status: "pending",
    userId: {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210"
    },
    hallId: { name: "Royal Banquet Hall" },
    date: new Date(),
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    totalPrice: 25000,
    paymentStatus: "pending",
    specialRequests: "Need decoration with flowers"
  },
  {
    _id: "2",
    createdAt: new Date(),
    status: "confirmed",
    userId: {
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "9123456780"
    },
    hallId: { name: "Grand Palace Hall" },
    date: new Date(),
    startTime: "06:00 PM",
    endTime: "11:00 PM",
    totalPrice: 40000,
    paymentStatus: "paid",
    specialRequests: "DJ system required"
  }
];

const BookingsManagement = () => {
  // ✅ use dummy data instead of context
  const [bookings, setBookings] = useState(dummyBookings);

  const [filters, setFilters] = useState({ status: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1
  });

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    // later replace with API
    setBookings(dummyBookings);
  }, []);

  const getStatusConfig = (status) => {
    const map = {
      pending: { color: "warning", icon: <Pending />, label: "Pending" },
      confirmed: { color: "success", icon: <CheckCircle />, label: "Confirmed" },
      cancelled: { color: "error", icon: <Cancel />, label: "Cancelled" }
    };
    return map[status] || map.pending;
  };

  return (
    <Box display="flex">

      {/* Sidebar */}
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Typography variant="h4" gutterBottom>
          Bookings Management (Demo)
        </Typography>

        {/* FILTER */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <Select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button variant="contained" startIcon={<Refresh />}>
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* TABLE */}
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Hall</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => {
                  const status = getStatusConfig(b.status);

                  return (
                    <TableRow key={b._id} hover>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 1 }}>
                            {b.userId.name[0]}
                          </Avatar>
                          <Box>
                            <Typography>{b.userId.name}</Typography>
                            <Typography variant="caption">
                              {b.userId.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>{b.hallId.name}</TableCell>

                      <TableCell>
                        {new Date(b.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {b.startTime} - {b.endTime}
                      </TableCell>

                      <TableCell>₹{b.totalPrice}</TableCell>

                      <TableCell>
                        <Chip
                          icon={status.icon}
                          label={status.label}
                          color={status.color}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            onClick={() => {
                              setSelectedBooking(b);
                              setDetailsOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>

                          <IconButton color="error">
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>

                    </TableRow>
                  );
                })
              )}
            </TableBody>

          </Table>
        </TableContainer>

        {/* DETAILS DIALOG */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          fullWidth
        >
          <DialogTitle>Booking Details</DialogTitle>

          <DialogContent>
            {selectedBooking && (
              <Box>
                <p><b>Name:</b> {selectedBooking.userId.name}</p>
                <p><b>Email:</b> {selectedBooking.userId.email}</p>
                <p><b>Hall:</b> {selectedBooking.hallId.name}</p>
                <p><b>Amount:</b> ₹{selectedBooking.totalPrice}</p>
                <p><b>Status:</b> {selectedBooking.status}</p>
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
          </DialogActions>

        </Dialog>

      </Box>
    </Box>
  );
};

export default BookingsManagement;