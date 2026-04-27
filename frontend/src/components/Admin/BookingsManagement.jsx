import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";

import {
  Visibility,
  Refresh,
  CheckCircle,
  Cancel,
  Pending
} from "@mui/icons-material";

import Sidebar from "./Sidebar";

// ================= API =================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 TOKEN ATTACHMENT (IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ status: "" });
  const [loading, setLoading] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await API.get("/bookings");

      setBookings(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });

      fetchBookings(); // refresh after update
    } catch (err) {
      console.log("STATUS ERROR:", err.response?.data || err.message);
    }
  };

  // ================= STATUS UI =================
  const getStatus = (status) => {
    switch (status) {
      case "confirmed":
        return { color: "success", icon: <CheckCircle /> };
      case "cancelled":
        return { color: "error", icon: <Cancel /> };
      default:
        return { color: "warning", icon: <Pending /> };
    }
  };

  return (
    <Box display="flex">
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        {/* HEADER */}
        <Typography variant="h4" gutterBottom>
          Bookings Management
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
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                startIcon={<Refresh />}
                variant="contained"
                onClick={fetchBookings}
              >
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
                <TableCell>User</TableCell>
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
                bookings
                  .filter((b) =>
                    filters.status ? b.status === filters.status : true
                  )
                  .map((b) => {
                    const status = getStatus(b.status);

                    return (
                      <TableRow key={b._id} hover>

                        {/* USER */}
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar>
                              {b.userId?.name?.charAt(0) || "U"}
                            </Avatar>
                            <div>
                              <div>{b.userId?.name}</div>
                              <small>{b.userId?.email}</small>
                            </div>
                          </Stack>
                        </TableCell>

                        {/* HALL */}
                        <TableCell>{b.hallId?.name}</TableCell>

                        {/* DATE */}
                        <TableCell>
                          {new Date(b.date).toLocaleDateString()}
                        </TableCell>

                        {/* TIME */}
                        <TableCell>
                          {b.startTime} - {b.endTime}
                        </TableCell>

                        {/* AMOUNT */}
                        <TableCell>₹{b.totalPrice}</TableCell>

                        {/* STATUS */}
                        <TableCell>
                          <Chip
                            icon={status.icon}
                            label={b.status}
                            color={status.color}
                            size="small"
                          />
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell>

                          <IconButton
                            onClick={() => {
                              setSelectedBooking(b);
                              setDetailsOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>

                          {/* APPROVE */}
                          <IconButton
                            color="success"
                            onClick={() =>
                              updateStatus(b._id, "confirmed")
                            }
                          >
                            <CheckCircle />
                          </IconButton>

                          {/* REJECT */}
                          <IconButton
                            color="error"
                            onClick={() =>
                              updateStatus(b._id, "cancelled")
                            }
                          >
                            <Cancel />
                          </IconButton>

                        </TableCell>

                      </TableRow>
                    );
                  })
              )}
            </TableBody>

          </Table>
        </TableContainer>

        {/* DETAILS MODAL */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          fullWidth
        >
          <DialogTitle>Booking Details</DialogTitle>

          <DialogContent>
            {selectedBooking && (
              <Box>
                <p><b>Name:</b> {selectedBooking.userId?.name}</p>
                <p><b>Email:</b> {selectedBooking.userId?.email}</p>
                <p><b>Hall:</b> {selectedBooking.hallId?.name}</p>
                <p><b>Date:</b> {new Date(selectedBooking.date).toDateString()}</p>
                <p><b>Time:</b> {selectedBooking.startTime} - {selectedBooking.endTime}</p>
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