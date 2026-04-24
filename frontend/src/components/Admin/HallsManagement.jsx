import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia,
  IconButton, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Chip, Stack, Alert,
  FormControlLabel, Switch, Tooltip
} from '@mui/material';

import {
  Add, Edit, Delete, People, AttachMoney,
  Wifi, LocalParking, AcUnit, Restaurant, Speaker
} from '@mui/icons-material';

import Sidebar from './Sidebar';

// ✅ DUMMY DATA (IMPORTANT FIX)
const dummyHalls = [
  {
    _id: "h1",
    name: "Royal Banquet Hall",
    capacity: 300,
    pricePerHour: 5000,
    description: "Luxury hall perfect for weddings and events.",
    amenities: ["AC", "WiFi", "Parking"],
    images: [],
    isAvailable: true,
    featured: true
  },
  {
    _id: "h2",
    name: "Grand Palace Hall",
    capacity: 500,
    pricePerHour: 8000,
    description: "Premium hall with modern facilities.",
    amenities: ["AC", "WiFi", "Catering"],
    images: [],
    isAvailable: false,
    featured: false
  }
];

const amenityOptions = [
  { value: 'AC', label: 'Air Conditioning', icon: <AcUnit /> },
  { value: 'WiFi', label: 'WiFi', icon: <Wifi /> },
  { value: 'Parking', label: 'Parking', icon: <LocalParking /> },
  { value: 'Catering', label: 'Catering', icon: <Restaurant /> },
  { value: 'Sound System', label: 'Sound System', icon: <Speaker /> }
];

const HallsManagement = () => {

  // ✅ use dummy instead of backend
  const [halls, setHalls] = useState(dummyHalls);

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

  useEffect(() => {
    setHalls(dummyHalls);
  }, []);

  const handleOpenDialog = (hall = null) => {
    if (hall) {
      setEditingHall(hall);
      setFormData(hall);
      setSelectedAmenities(hall.amenities);
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

  const toggleAmenity = (value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  const handleSave = () => {
    const newHall = {
      ...formData,
      _id: Date.now().toString(),
      capacity: Number(formData.capacity),
      pricePerHour: Number(formData.pricePerHour),
      amenities: selectedAmenities
    };

    if (editingHall) {
      setHalls(halls.map(h => h._id === editingHall._id ? newHall : h));
    } else {
      setHalls([...halls, newHall]);
    }

    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    setHalls(halls.filter(h => h._id !== id));
  };

  return (
    <Box display="flex">

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Halls Management (Demo)</Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Hall
          </Button>
        </Box>

        {halls.length === 0 && (
          <Alert severity="info">No halls found</Alert>
        )}

        <Grid container spacing={3}>
          {halls.map((hall) => (
            <Grid item xs={12} md={6} lg={4} key={hall._id}>

              <Card>

                <CardMedia
                  component="img"
                  height="160"
                  image="https://via.placeholder.com/400x200"
                />

                <CardContent>

                  <Typography variant="h6">
                    {hall.name}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip icon={<People />} label={hall.capacity} />
                    <Chip icon={<AttachMoney />} label={`₹${hall.pricePerHour}`} />
                  </Stack>

                  <Typography variant="body2" mt={1}>
                    {hall.description}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    <IconButton onClick={() => handleOpenDialog(hall)}>
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(hall._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>

                </CardContent>

              </Card>

            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>

          <DialogTitle>
            {editingHall ? "Edit Hall" : "Add Hall"}
          </DialogTitle>

          <DialogContent>

            <TextField
              fullWidth
              label="Name"
              margin="dense"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Capacity"
              margin="dense"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Price"
              margin="dense"
              value={formData.pricePerHour}
              onChange={(e) =>
                setFormData({ ...formData, pricePerHour: e.target.value })
              }
            />

            <Typography mt={2}>Amenities</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">

              {amenityOptions.map((a) => (
                <Chip
                  key={a.value}
                  label={a.label}
                  icon={a.icon}
                  clickable
                  color={
                    selectedAmenities.includes(a.value)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => toggleAmenity(a.value)}
                />
              ))}

            </Stack>

          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>

        </Dialog>

      </Box>
    </Box>
  );
};

export default HallsManagement;