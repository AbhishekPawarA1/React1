import React, { useState } from "react";
import axios from "axios";
import "../css/edit.css"
const url = "https://st-project-43ecc-default-rtdb.firebaseio.com/users/.json";

export function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    setError("");
    setLoading(true);

    // Create user data
    const newUser = {
      name,
      email,
      bio,
      profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
    };

    try {
      await axios.post(url, newUser);
      onUserAdded(newUser); // Update the user list in the parent component
      setName("");
      setEmail("");
      setBio("");
      setProfilePic(null);
    } catch {
      setError("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Add New User</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group">
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter bio"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
