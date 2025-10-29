import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../service/config"

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseurl}/api/v1/expense/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
        console.log("Fetched Expenses:", res.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p style={{ color: "#777" }}>No expenses added yet.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "15px",
          }}
        >
          {expenses.map((exp) => (
            <div
              key={exp._id}
              style={{
                width: "220px",
                borderRadius: "10px",
                background: "#fff",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>
                {exp.icon} {exp.category}
              </h3>
              <p style={{ fontWeight: "bold", color: "#007bff" }}>
                Rs. {exp.amount}
              </p>
              <p style={{ fontSize: "13px", color: "#666" }}>
                {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
