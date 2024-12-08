import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/input.css"
import { AddUserForm } from "./edit";
const url = "https://st-project-43ecc-default-rtdb.firebaseio.com/users/.json";

export function Input() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const userList = response.data ? Object.values(response.data) : [];
        setUsers(userList);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="user-input-container">
      <AddUserForm onUserAdded={handleUserAdded} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="user-list">
        {!loading &&
          !error &&
          users.map((user, index) => (
            <div key={index} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>{user.bio}</p>
              {user.profilePic && (
                <img src={user.profilePic} alt={`${user.name}'s profile`} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
