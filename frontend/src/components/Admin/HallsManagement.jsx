// components/Admin/HallsManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia,
  IconButton, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Chip, Stack, Alert, Fab,
  FormControlLabel, Switch, Rating, Tooltip
} from '@mui/material';
import {
  Add, Edit, Delete, Close, Image, LocationOn,
  People, AttachMoney, Wifi, LocalParking, AcUnit,
  Restaurant, Speaker, Refresh
} from '@mui/icons-material';
import { useBooking } from '../../context/BookingContext';
import Sidebar from './Sidebar';
import LoadingSpinner from '../Common/LoadingSpinner';

const HallsManagement = () => {
  const { halls, fetchHalls, createHall, updateHall, deleteHall, loading, error } = useBooking();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    pricePerHour: '',
    description: '',
    amenities: [],
    images: [],
    isAvailable: true,
    featured: false
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenityOptions = [
    { value: 'AC', label: 'Air Conditioning', icon: <AcUnit /> },
    { value: 'WiFi', label: 'WiFi', icon: <Wifi /> },
    { value: 'Parking', label: 'Parking', icon: <LocalParking /> },
    { value: 'Catering', label: 'Catering', icon: <Restaurant /> },
    { value: 'Sound System', label: 'Sound System', icon: <Speaker /> },
    { value: 'Projector', label: 'Projector', icon: <Speaker /> }
  ];

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleOpenDialog = (hall = null) => {
    if (hall) {
      setEditingHall(hall);
      setFormData({
        name: hall.name,
        capacity: hall.capacity,
        pricePerHour: hall.pricePerHour,
        description: hall.description,
        amenities: hall.amenities || [],
        images: hall.images || [],
        isAvailable: hall.isAvailable,
        featured: hall.featured
      });
      setSelectedAmenities(hall.amenities || []);
    } else {
      setEditingHall(null);
      setFormData({
        name: '',
        capacity: '',
        pricePerHour: '',
        description: '',
        amenities: [],
        images: [],
        isAvailable: true,
        featured: false
      });
      setSelectedAmenities([]);
    }
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    const hallData = {
      ...formData,
      capacity: Number(formData.capacity),
      pricePerHour: Number(formData.pricePerHour),
      amenities: selectedAmenities
    };

    let result;
    if (editingHall) {
      result = await updateHall(editingHall._id, hallData);
    } else {
      result = await createHall(hallData);
    }

    if (result.success) {
      setDialogOpen(false);
      await fetchHalls();
    }
  };

  const handleDelete = async (hallId) => {
    if (window.confirm('Are you sure you want to delete this hall? This action cannot be undone.')) {
      const result = await deleteHall(hallId);
      if (result.success) {
        await fetchHalls();
      }
    }
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" gutterBottom>Manage Halls</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Hall
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Grid container spacing={3}>
            {halls.map((hall) => (
              <Grid item xs={12} md={6} lg={4} key={hall._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hall.images?.[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={hall.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="start">
                      <Typography variant="h6" gutterBottom>
                        {hall.name}
                      </Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleOpenDialog(hall)} size="small">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(hall._id)} color="error" size="small">
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    <Stack direction="row" spacing={2} mb={2}>
                      <Chip
                        icon={<People />}
                        label={`${hall.capacity} people`}
                        size="small"
                      />
                      <Chip
                        icon={<AttachMoney />}
                        label={`₹${hall.pricePerHour}/hour`}
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={hall.isAvailable ? 'Available' : 'Not Available'}
                        size="small"
                        color={hall.isAvailable ? 'success' : 'error'}
                      />
                    </Stack>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {hall.description.substring(0, 100)}...
                    </Typography>
                    
                    <Box mt={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        Amenities:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {hall.amenities?.map((amenity) => (
                          <Chip
                            key={amenity}
                            label={amenity}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Hall Form Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingHall ? 'Edit Hall' : 'Add New Hall'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hall Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Capacity (people)"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price per Hour (₹)"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Amenities
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {amenityOptions.map((amenity) => (
                    <Chip
                      key={amenity.value}
                      icon={amenity.icon}
                      label={amenity.label}
                      onClick={() => toggleAmenity(amenity.value)}
                      color={selectedAmenities.includes(amenity.value) ? 'primary' : 'default'}
                      variant={selectedAmenities.includes(amenity.value) ? 'filled' : 'outlined'}
                      clickable
                    />
                  ))}
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URLs (comma separated)"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  value={formData.images.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    images: e.target.value.split(',').map(url => url.trim()).filter(url => url)
                  })}
                  helperText="Enter image URLs separated by commas"
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                  }
                  label="Available for booking"
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                  }
                  label="Featured Hall"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editingHall ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default HallsManagement;