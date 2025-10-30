import React, { useState } from "react";
import axios from "axios";
import baseurl from "../service/config";
import { FaRegCalendarAlt, FaPlus, FaCheck } from "react-icons/fa";

export default function AddIncome() {
  const today = new Date().toISOString().split("T")[0]; 

  const [icon, setIcon] = useState("💰");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIncome = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseurl}/api/v1/income/add`,
        { icon, amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Income added successfully!");
      setAmount("");
      setCategory("");
      setDate(today);
    } catch (error) {
      console.error("Error adding income:", error);
      setMessage("Failed to add income!");
    } finally {
      setIsLoading(false);
    }
  };

  const iconOptions = [
    { value: "💰", label: "General" },
    { value: "💼", label: "Salary" },
    { value: "🏠", label: "Rental" },
    { value: "📈", label: "Investment" },
    { value: "🎁", label: "Gift" },
    { value: "🛒", label: "Business" },
    { value: "🏆", label: "Bonus" },
    { value: "🎯", label: "Freelance" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleAddIncome}
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
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "10px"
          }}>
          </div>
          <h2 style={{
            color: "#2d3748",
            marginBottom: "5px",
            fontSize: "24px",
            fontWeight: "600",
          }}>
            Add New Income
          </h2>
          <p style={{
            color: "#718096",
            fontSize: "14px",
            margin: 0,
          }}>
            Track your income sources
          </p>
        </div>

        {/* Icon Selection */}
        <div>
          <label style={{ 
            color: "#4a5568", 
            fontSize: "14px", 
            fontWeight: "600", 
            marginBottom: "10px", 
            display: "block" 
          }}>
            Income Type
          </label>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "8px" 
          }}>
            {iconOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setIcon(option.value)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "8px 6px",
                  borderRadius: "8px",
                  border: icon === option.value ? "2px solid #2196F3" : "1px solid #e2e8f0",
                  backgroundColor: icon === option.value ? "#ebf8ff" : "#fff",
                  cursor: "pointer",
                  minWidth: "0",
                }}
              >
                <span style={{ fontSize: "20px", marginBottom: "4px" }}>{option.value}</span>
                <span style={{ 
                  fontSize: "9px", 
                  color: icon === option.value ? "#2196F3" : "#718096", 
                  fontWeight: "500",
                  textAlign: "center",
                  lineHeight: "1.2"
                }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label style={{ 
            color: "#4a5568", 
            fontSize: "14px", 
            fontWeight: "600", 
            marginBottom: "8px", 
            display: "block" 
          }}>
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
                fontWeight: "500",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#2196F3",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              ₹
            </span>
          </div>
        </div>

        {/* Category Input */}
        <div>
          <label style={{ 
            color: "#4a5568", 
            fontSize: "14px", 
            fontWeight: "600", 
            marginBottom: "8px", 
            display: "block" 
          }}>
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Salary, Freelance, Investment"
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
              fontWeight: "500",
            }}
          />
        </div>

        {/* Date Input */}
        <div>
          <label style={{ 
            color: "#4a5568", 
            fontSize: "14px", 
            fontWeight: "600", 
            marginBottom: "8px", 
            display: "block" 
          }}>
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
                fontWeight: "500",
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
            background: isLoading ? "#a0aec0" : "#2196F3",
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
              <div style={{ 
                width: "16px", 
                height: "16px", 
                border: "2px solid #fff", 
                borderRadius: "50%", 
              }} />
              Adding Income...
            </>
          ) : (
            <>
              <FaPlus style={{ fontSize: "14px" }} />
              Add Income
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
              color: message.includes("successfully") 
                ? "#2d7d32" 
                : "#c53030",
              fontSize: "14px",
              fontWeight: "500",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              border: message.includes("successfully") 
                ? "1px solid #c6f6d5" 
                : "1px solid #fed7d7",
            }}
          >
            <FaCheck style={{ fontSize: "12px" }} />
            {message}
          </div>
        )}
      </form>
    </div>
  );
}