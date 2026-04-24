import { useNavigate } from "react-router-dom";

const Halls = () => {
  const navigate = useNavigate();

  const halls = [
    { _id: "64a1", name: "Royal Palace" },
    { _id: "64a2", name: "Grand Hall" },
  ];

  return (
    <div>
      {halls.map((hall) => (
        <div key={hall._id}>
          <h3>{hall.name}</h3>

          <button onClick={() => navigate(`/book/${hall._id}`)}>
            Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default Halls;