import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../service/config";

export default function StatsCards() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseurl}/api/v1/expense/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Calculate totals directly from response data
        const expenses = res.data || [];
        let expenseSum = 0;
        expenses.forEach((e) => {
          expenseSum += e.amount;
        });

        setTotalExpense(expenseSum);
        setTotalIncome(0); // abhi static rakha
      } catch (err) {
        console.error("Error fetching totals:", err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
      }}
    >
      {/* Income Card */}
      <div
        style={{
          flex: 1,
          margin: "0 10px",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
        }}
      >
        <h3>💰 Total Income</h3>
        <h2>Rs. {totalIncome}</h2>
      </div>

      {/* Expense Card */}
      <div
        style={{
          flex: 1,
          margin: "0 10px",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
        }}
      >
        <h3>🛒 Total Expense</h3>
        <h2>Rs. {totalExpense}</h2>
      </div>

      {/* Net Balance Card */}
      <div
        style={{
          flex: 1,
          margin: "0 10px",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
        }}
      >
        <h3>⚖️ Net Balance</h3>
        <h2>Rs. {totalIncome - totalExpense}</h2>
      </div>
    </div>
  );
}
