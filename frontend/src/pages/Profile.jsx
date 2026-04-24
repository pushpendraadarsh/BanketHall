import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      <div style={styles.card}>
        <div style={styles.avatar}>
          {user.email?.charAt(0).toUpperCase()}
        </div>

        <div style={styles.info}>
          <p>
            <span style={styles.label}>Email:</span> {user.email}
          </p>
          <p>
            <span style={styles.label}>Role:</span> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontWeight: "600",
    marginRight: "6px",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
  },
};

export default Profile;