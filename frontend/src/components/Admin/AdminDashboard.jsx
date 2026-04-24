import React, { useEffect, useState, useMemo } from 'react';
import {
  Grid, Paper, Typography, Box, Card, CardContent,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Alert, Skeleton, Divider
} from '@mui/material';

import {
  EventAvailable, AttachMoney, People
} from '@mui/icons-material';

import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer
} from 'recharts';

import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

// Stat Card (Bootstrap Style)
const StatCard = ({ title, value, icon, bg }) => (
  <Card sx={{ height: '100%', bgcolor: bg, color: 'white', boxShadow: 3 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value ?? '--'}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

// Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">{label}</Typography>
        {payload.map((p, i) => (
          <Typography key={i}>
            {p.name}: {p.value}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const { stats, fetchStats, loading, error } = useBooking();
  const { user } = useAuth();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (stats?.monthlyBookings) {
      setChartData(
        stats.monthlyBookings.map(item => ({
          month: `${item._id.month}/${item._id.year}`,
          bookings: item.count,
          revenue: item.revenue
        }))
      );
    }
  }, [stats]);

  if (loading && !stats) return <LoadingSpinner />;

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>

      {/* Header */}
      <Typography variant="h4" mb={3} fontWeight="bold">
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Primary Card"
            value={stats?.totalBookings}
            icon={<EventAvailable />}
            bg="#0d6efd"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Warning Card"
            value={stats?.pendingBookings}
            icon={<EventAvailable />}
            bg="#ffc107"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Success Card"
            value={stats?.confirmedBookings}
            icon={<AttachMoney />}
            bg="#198754"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Danger Card"
            value={stats?.cancelledBookings}
            icon={<People />}
            bg="#dc3545"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={1}>Area Chart Example</Typography>
            <Divider sx={{ mb: 2 }} />

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Line dataKey="bookings" stroke="#0d6efd" strokeWidth={2} />
                <Line dataKey="revenue" stroke="#198754" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={1}>Bar Chart Example</Typography>
            <Divider sx={{ mb: 2 }} />

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="bookings" stroke="#ffc107" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Card sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" mb={1}>DataTable Example</Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stats?.usersTable?.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.office}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>${row.salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>

    </Box>
  );
};

export default AdminDashboard;