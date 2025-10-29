import React, { useState } from "react";
import axios from "axios";
import baseurl from "../service/config"

export default function AddExpense() {
  const [icon, setIcon] = useState("💰");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // token after login

      const res = await axios.post(
        `${baseurl}/api/v1/expense/add`,
        { icon, amount, category, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Expense added successfully!");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
      setMessage("❌ Failed to add expense!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f8f9fd",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleAddExpense}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>Add New Expense</h2>

        <label>Icon</label>
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option>💰</option>
          <option>🍔</option>
          <option>🚗</option>
          <option>🎮</option>
          <option>🛍️</option>
        </select>

        <label>Amount (Rs)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Food, Travel"
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Expense
        </button>

        {message && (
          <p style={{ textAlign: "center", color: "#555", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
