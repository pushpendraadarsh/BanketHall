import React from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../Form/BookingForm.jsx";

const HallPage = () => {
  const { id } = useParams();

  if (!id) return <p>Invalid hall</p>;

  return (
    <div>
      <h2>Book Hall</h2>

      {/* ✅ REAL MONGO ID */}
      <BookingForm hallId={id} />
    </div>
  );
};

export default HallPage;