import React, { useState } from "react";
import axios from "axios";
import baseurl from "../service/config";
import { FaRegCalendarAlt, FaPlus, FaCheck } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function AddExpense() {
  const today = new Date().toISOString().split("T")[0];

  const [icon, setIcon] = useState("💰");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseurl}/api/v1/expense/add`,
        { icon, amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Expense added successfully!");
      setAmount("");
      setCategory("");
      setDate(today);
    } catch (error) {
      console.error("Error adding expense:", error);
      setMessage("Failed to add expense!");
    } finally {
      setIsLoading(false);
    }
  };

  const iconOptions = [
    { value: "💰", label: "General" },
    { value: "🍔", label: "Food" },
    { value: "🚗", label: "Transport" },
    { value: "🏠", label: "Housing" },
    { value: "🎮", label: "Entertainment" },
    { value: "🛍️", label: "Shopping" },
    { value: "🏥", label: "Health" },
    { value: "✈️", label: "Travel" },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flex: 1,
          width: "100%",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <Sidebar />
        <form
          onSubmit={handleAddExpense}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2d3748",
              marginBottom: "10px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Add New Expense
          </h2>

          {/* Icon Selection */}
          <div>
            <label
              style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Icon
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {iconOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setIcon(option.value)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border:
                      icon === option.value
                        ? "2px solid #4CAF50"
                        : "1px solid #e2e8f0",
                    backgroundColor: icon === option.value ? "#f0fff4" : "#fff",
                    cursor: "pointer",
                    minWidth: "60px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{option.value}</span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#718096",
                      marginTop: "2px",
                    }}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label
              style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Amount (Rs)
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                style={{
                  padding: "12px 16px 12px 40px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                  color: "#2d3748",
                  fontSize: "16px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#718096",
                  fontSize: "16px",
                }}
              >
                ₹
              </span>
            </div>
          </div>

          {/* Category Input */}
          <div>
            <label
              style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Groceries, Fuel, Dining"
              required
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                color: "#2d3748",
                fontSize: "16px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Date Input */}
          <div>
            <label
              style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Date
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  padding: "12px 16px 12px 40px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                  color: "#2d3748",
                  fontSize: "16px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <FaRegCalendarAlt
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#718096",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: isLoading ? "#a0aec0" : "#4CAF50",
              color: "#fff",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "16px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #fff",
                    borderRadius: "50%",
                  }}
                />
                Adding...
              </>
            ) : (
              <>
                <FaPlus style={{ fontSize: "14px" }} />
                Add Expense
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div
              style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: message.includes("successfully")
                  ? "#f0fff4"
                  : "#fed7d7",
                color: message.includes("successfully") ? "#2d7d32" : "#c53030",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaCheck style={{ fontSize: "12px" }} />
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
