import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Halls = () => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = axios.create({
    baseURL: "http://localhost:5000/api/halls",
  });

  API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  // ✅ IMAGE HELPER (FIXED)
  const getImage = (hall) => {
    if (!hall?.images || hall.images.length === 0) {
      return "https://picsum.photos/400/250";
    }

    const img = hall.images[0];

    if (img.startsWith("http")) return img;

    return `http://localhost:5000/uploads/${img}`;
  };

  // FETCH
  const fetchHalls = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      setHalls(res.data);
    } catch (err) {
      console.log("Error fetching halls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Available Halls
      </h1>

      {loading && (
        <p className="text-gray-500">Loading halls...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {halls.map((hall) => (
          <div
            key={hall._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* IMAGE */}
            <img
              src={getImage(hall)}
              alt={hall.name}
              className="h-44 w-full object-cover"
              onError={(e) => {
                e.target.src = "https://picsum.photos/400/250";
              }}
            />

            <div className="p-4 space-y-2">

              <h2 className="text-lg font-semibold text-gray-800">
                {hall.name}
              </h2>

              <p className="text-sm text-gray-500">
                Capacity: {hall.capacity}
              </p>

              <p className="text-md font-semibold text-[#878C53]">
                ₹{hall.pricePerHour} / hour
              </p>

              <p className="text-sm text-gray-500 line-clamp-2">
                {hall.description}
              </p>

              {hall.amenities?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {hall.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => navigate(`/book/${hall._id}`)}
                className="w-full mt-3 bg-[#878C53] hover:bg-[#6f7445] text-white py-2 rounded-lg transition"
              >
                Book Now
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Halls;