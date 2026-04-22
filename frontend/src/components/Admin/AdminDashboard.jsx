// components/Admin/AdminDashboard.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Grid, Paper, Typography, Box, Card, CardContent,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Avatar, IconButton, Tooltip,
  Alert, Snackbar, Skeleton, Divider, Button
} from '@mui/material';
import {
  EventAvailable, Pending, CheckCircle,
  People, AttachMoney, TrendingUp, Refresh,
  MeetingRoom, Download, FilterList
} from '@mui/icons-material';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import LoadingSpinner from '../Common/LoadingSpinner';

const drawerWidth = 260;

// Enhanced StatCard component
const StatCard = ({ title, value, icon, color, trend, loading, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[8],
        cursor: onClick ? 'pointer' : 'default'
      }
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Typography color="textSecondary" variant="overline" gutterBottom fontWeight="600">
            {title}
          </Typography>
          {loading ? (
            <Skeleton variant="text" width="80%" height={48} />
          ) : (
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          )}
          {trend && !loading && (
            <Box display="flex" alignItems="center" mt={1}>
              <TrendingUp sx={{ fontSize: 14, color: 'success.main', mr: 0.5 }} />
              <Typography variant="caption" color="success.main" fontWeight="500">
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar 
          sx={{ 
            bgcolor: color, 
            width: 56, 
            height: 56,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1.5, bgcolor: 'background.paper', boxShadow: 3 }}>
        <Typography variant="body2" fontWeight="bold">{label}</Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="caption" color={entry.color}>
            {entry.name}: {entry.name === 'Revenue (₹)' ? '₹' : ''}{entry.value.toLocaleString()}
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchStats();
      setSnackbar({ open: true, message: 'Dashboard data refreshed successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to refresh data', severity: 'error' });
    } finally {
      setRefreshing(false);
    }
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (stats?.monthlyBookings && stats.monthlyBookings.length > 0) {
      const formattedData = stats.monthlyBookings.map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        bookings: item.count || 0,
        revenue: item.revenue || 0
      }));
      setChartData(formattedData);
    } else {
      setChartData([
        { month: 'Jan', bookings: 0, revenue: 0 },
        { month: 'Feb', bookings: 0, revenue: 0 },
        { month: 'Mar', bookings: 0, revenue: 0 },
        { month: 'Apr', bookings: 0, revenue: 0 },
        { month: 'May', bookings: 0, revenue: 0 },
        { month: 'Jun', bookings: 0, revenue: 0 }
      ]);
    }
  }, [stats]);

  const pieData = useMemo(() => stats ? [
    { name: 'Pending', value: stats.pendingBookings || 0, color: '#ed6c02' },
    { name: 'Confirmed', value: stats.confirmedBookings || 0, color: '#2e7d32' },
    { name: 'Cancelled', value: stats.cancelledBookings || 0, color: '#d32f2f' },
    { name: 'Completed', value: stats.completedBookings || 0, color: '#1976d2' }
  ] : [], [stats]);

  const COLORS = ['#ed6c02', '#2e7d32', '#d32f2f', '#1976d2'];

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  if (loading && !stats) return <LoadingSpinner />;
  
  if (error) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={fetchStats}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' ,marginTop:"24px"}}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          ml: `${drawerWidth}px`,
          bgcolor: '#f5f5f5', 
          minHeight: '100vh',
          width: `calc(100% - ${drawerWidth}px)`
        }}
      >
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, {user?.name || 'Admin'}! 👋
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Here's what's happening with your banquet hall business today.
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Export Report">
              <IconButton color="primary" sx={{ bgcolor: 'white' }}>
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter Data">
              <IconButton color="primary" sx={{ bgcolor: 'white' }}>
                <FilterList />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={handleRefresh} 
                color="primary" 
                disabled={refreshing}
                sx={{ bgcolor: 'white' }}
              >
                <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard 
              title="Total Bookings" 
              value={stats?.totalBookings?.toLocaleString() || 0} 
              icon={<EventAvailable />} 
              color="#1976d2"
              trend="+12% from last month"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard 
              title="Pending Approvals" 
              value={stats?.pendingBookings?.toLocaleString() || 0} 
              icon={<Pending />} 
              color="#ed6c02"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard 
              title="Active Bookings" 
              value={stats?.confirmedBookings?.toLocaleString() || 0} 
              icon={<CheckCircle />} 
              color="#2e7d32"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard 
              title="Total Revenue" 
              value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} 
              icon={<AttachMoney />} 
              color="#9c27b0"
              trend="+23% growth"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard 
              title="Active Users" 
              value={stats?.totalUsers?.toLocaleString() || 0} 
              icon={<People />} 
              color="#0288d1"
              loading={loading}
            />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Booking & Revenue Trends
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#1976d2" 
                    name="Bookings" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2e7d32" 
                    name="Revenue (₹)" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Booking Status Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                🏆 Popular Halls
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell><strong>Hall Name</strong></TableCell>
                      <TableCell align="right"><strong>Bookings</strong></TableCell>
                      <TableCell align="right"><strong>Revenue</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats?.popularHalls && stats.popularHalls.length > 0 ? (
                      stats.popularHalls.map((hall, index) => (
                        <TableRow key={hall._id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <MeetingRoom sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                              <Typography variant="body2" fontWeight={index === 0 ? 'bold' : 'normal'}>
                                {hall.hall?.name || hall.name || 'Unknown Hall'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={`${hall.count} bookings`} 
                              size="small" 
                              color="primary" 
                              variant={index === 0 ? "filled" : "outlined"}
                            />
                          </TableCell>
                          <TableCell align="right">
                            ₹{(hall.revenue || 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography color="textSecondary">No data available</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                📋 Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell><strong>Event Details</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                      stats.recentBookings.slice(0, 5).map((booking) => (
                        <TableRow key={booking._id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {booking.userId?.name || 'Guest User'}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {booking.hallId?.name || 'Unknown Hall'} • {booking.startTime} - {booking.endTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(booking.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={booking.status?.toUpperCase() || 'UNKNOWN'} 
                              size="small"
                              color={getStatusColor(booking.status)}
                              variant="filled"
                              sx={{ fontWeight: 500 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography color="textSecondary">No recent activity</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default AdminDashboard;