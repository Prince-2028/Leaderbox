import { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./AddUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(selectedUser);
  }, []);

  const claimPoints = async () => {
    if (selectedUser) {
      try {
        await axios.post("http://localhost:5000/api/claim", {
          uniqId: selectedUser,
        });
        setNotification("Successfully claimed!");
        fetchUsers(); // Refresh user list after claiming points
        setTimeout(() => setNotification(""), 2000);
      } catch (error) {
        alert("Error claiming points.");
      }
    } else {
      alert("Please select a user first.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      {notification && (
        <div
          style={{
            background: "#e6fffa",
            color: "#38a169",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "16px",
            fontWeight: "bold",
            border: "1px solid #38a169",
            boxShadow: "0 2px 8px rgba(56,161,105,0.10)",
          }}
        >
          {notification}
        </div>
      )}
      <AddUser showModal={showAddModal} setShowModal={setShowAddModal} />

      <button onClick={claimPoints}>claim</button>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>User List</h2>
      <select
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "24px",
        }}
        defaultValue=""
        onChange={(e) => {
          const selectedIdx = e.target.value;
          if (selectedIdx !== "") {
            setSelectedUser(users[selectedIdx]._id);
          }
        }}
      >
        <option value="">Select a user</option>
        {users.map((user, idx) => (
          <option key={idx} value={idx}>
            {user.name} ({user.totalPoints} pts)
          </option>
        ))}
      </select>
      <div>
        {users.map((user, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              margin: "8px 0",
              background: "#f5f5f5",
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{user.name}</span>
            <span style={{ color: "#555" }}>Points: {user.totalPoints}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
