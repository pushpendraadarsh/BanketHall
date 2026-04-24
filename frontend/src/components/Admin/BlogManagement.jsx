import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Alert
} from "@mui/material";

import { Delete, Edit, Add } from "@mui/icons-material";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Best Wedding Venues in Delhi",
      description: "Explore top banquet halls for weddings in Delhi.",
      image: "https://source.unsplash.com/600x400/?wedding",
      date: "2026-04-20"
    },
    {
      id: 2,
      title: "How to Plan Corporate Events",
      description: "Step by step guide for corporate event planning.",
      image: "https://source.unsplash.com/600x400/?conference",
      date: "2026-04-18"
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: ""
  });

  const handleOpen = (blog = null) => {
    if (blog) {
      setEditId(blog.id);
      setForm(blog);
    } else {
      setEditId(null);
      setForm({ title: "", description: "", image: "" });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.description) return;

    if (editId) {
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === editId ? { ...b, ...form } : b
        )
      );
    } else {
      const newBlog = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0]
      };
      setBlogs([newBlog, ...blogs]);
    }

    setOpen(false);
    setForm({ title: "", description: "", image: "" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Blog Management</Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Blog
        </Button>
      </Box>

      {/* BLOG LIST */}
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={4} key={blog.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={blog.image}
                alt={blog.title}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {blog.description.substring(0, 80)}...
                </Typography>

                <Stack direction="row" justifyContent="space-between" mt={2}>
                  <Chip label={blog.date} size="small" />

                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(blog)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editId ? "Edit Blog" : "Create Blog"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          {form.image && (
            <Box mt={2}>
              <img
                src={form.image}
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: "10px"
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editId ? "Update" : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogManagement;