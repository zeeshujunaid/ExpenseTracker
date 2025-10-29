import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/v1/expense/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched expenses:", res);
        setExpenses(res.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins" }}>
      <h1 style={{ fontWeight: "600", fontSize: "28px" }}>💰 Your Expenses</h1>

      <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <div
              key={exp._id}
              style={{
                width: "250px",
                borderRadius: "12px",
                padding: "20px",
                background: "#f9f9f9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "20px" }}>{exp.icon} {exp.category}</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>Amount: <b>Rs. {exp.amount}</b></p>
              <p style={{ marginTop: "5px", fontSize: "13px", color: "#888" }}>
                {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
