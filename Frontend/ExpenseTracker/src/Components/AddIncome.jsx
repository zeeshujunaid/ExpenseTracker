import React, { useState } from "react";
import axios from "axios";
import baseurl from "../service/config";

export default function AddIncome() {
  const today = new Date().toISOString().split("T")[0]; 

  const [icon, setIcon] = useState("💰");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today); // default current date
  const [message, setMessage] = useState("");

  const handleAddincome = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseurl}/api/v1/income/add`,
        { icon, amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(" income added successfully!");
      setAmount("");
      setCategory("");
      setDate(today); // reset to current date
    } catch (error) {
      console.error("Error adding income:", error);
      setMessage(" Failed to add income!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        background: "#f8f9fd",
        fontFamily: "sans-serif",
        minHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleAddincome}
        style={{
          background: "#fff",
          padding: "30px",
          marginTop: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>
          Add New income
        </h2>

        <label style={{color:"#000"}}>Icon</label>
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <option>💰</option>
          <option>🍔</option>
          <option>🚗</option>
          <option>🎮</option>
          <option>🛍️</option>
        </select>

        <label style={{color:"#000"}}>Amount (Rs)</label>
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
            backgroundColor: "#fff",
            color: "#000",
          }}
        />

        <label style={{color:"#000"}}>Category</label>
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
            backgroundColor: "#fff",
            color: "#000",
          }}
        />

        <label style={{color:"#000"}}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} // user change updates state
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
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
          Add income
        </button>

        {message && (
          <p style={{ textAlign: "center", color: "#555", marginTop: "10px" }}>{message}</p>
        )}
      </form>
    </div>
  );
}
