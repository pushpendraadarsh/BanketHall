import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/halls";

const HallsManagement = () => {
  const [halls, setHalls] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    capacity: "",
    pricePerHour: "",
    description: "",
    image: null
  });

  // ---------------- FETCH ----------------
  const fetchHalls = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setHalls(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  // ---------------- OPEN ----------------
  const handleOpen = (hall = null) => {
    if (hall) {
      setEditingId(hall._id);
      setForm({
        name: hall.name || "",
        capacity: hall.capacity || "",
        pricePerHour: hall.pricePerHour || "",
        description: hall.description || "",
        image: null
      });
    } else {
      setEditingId(null);
      setForm({
        name: "",
        capacity: "",
        pricePerHour: "",
        description: "",
        image: null
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    try {
      setSaving(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("capacity", form.capacity);
      data.append("pricePerHour", form.pricePerHour);
      data.append("description", form.description);

      if (form.image) {
        data.append("image", form.image);
      }

      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, data);
      } else {
        await axios.post(API_BASE, data);
      }

      handleClose();
      fetchHalls();
    } catch (err) {
      console.log("SAVE ERROR:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hall?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      setHalls((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Halls Management</h1>
          <p className="text-gray-500 text-sm">Manage banquet halls</p>
        </div>

        <button
          onClick={() => handleOpen()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Hall
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-blue-100 text-blue-700 p-3 rounded">
          Loading halls...
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div key={hall._id} className="bg-white rounded shadow">

           <img
  src={
    hall.images?.length
      ? `http://localhost:5000/uploads/${hall.images[0]}`
      : "https://picsum.photos/400/200"
  }
/>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{hall.name}</h2>

              <div className="flex gap-2 text-sm">
                <span className="bg-gray-200 px-2 py-1 rounded">
                  👥 {hall.capacity}
                </span>
                <span className="bg-gray-200 px-2 py-1 rounded">
                  ₹{hall.pricePerHour}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {hall.description}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleOpen(hall)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(hall._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white rounded p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Hall" : "Add Hall"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Capacity"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Price per Hour"
              value={form.pricePerHour}
              onChange={(e) =>
                setForm({ ...form, pricePerHour: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="preview"
                className="w-full h-40 object-cover rounded"
              />
            )}

            <div className="flex justify-end gap-2">
              <button onClick={handleClose}>Cancel</button>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default HallsManagement;