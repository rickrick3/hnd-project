import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <img src="/assets/img/download.jpg" alt="User Avatar" style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        
        <h1 style={{ marginTop: "10px", marginBottom: "5px" }}>John Doe</h1>
        <p>Software Engineer</p>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <h2>User Information</h2>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Phone:</strong> +237 6234123
        </p>
        <p>
          <strong>Budget:</strong> $5000
        </p>
        <p>
          <strong>Address:</strong> 123 Main Street, Douala, Cameroon
        </p>
      </div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;
