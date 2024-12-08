import React, { useState } from "react";
import axios from "axios";

const url = "https://st-project-43ecc-default-rtdb.firebaseio.com/users";

export function DeleteUser({ userId, onUserDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.delete(`${url}/${userId}.json`);
      onUserDeleted(userId); // Notify parent to update UI
    } catch {
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
