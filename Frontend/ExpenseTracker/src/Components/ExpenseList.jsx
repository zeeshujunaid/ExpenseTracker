import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../service/config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);

 useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseurl}/api/v1/expense/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const expense = res.data;

      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const data = months.map((month, idx) => ({
        month,
        Expense: expense  // use the fetched data directly
          .filter((i) => new Date(i.date).getMonth() === idx)
          .reduce((sum, i) => sum + Number(i.amount), 0),
      }));

      setExpenses(expense);
      setChartData(data);

      console.log("Fetched Expenses:", expense);
      console.log("Chart Data:", data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  fetchExpenses();
}, []);


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px", color: "#000" }}>Your Expenses</h2>

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
                padding: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#000" }}>
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

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginTop: 20,
        }}
      >
        <h2>Expense (Monthly)</h2>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Expense"
              stroke="#4CAF50"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
