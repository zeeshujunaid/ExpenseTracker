import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import AddExpense from "../Components/AddExpense";
import AddIncome from "../Components/AddIncome";
import ExpenseList from "../Components/ExpenseList";
import IncomeList from "../Components/IncomeList";
import axios from "axios";
import baseurl from "../service/config";

export default function Dashboard() {
  const [activeScreen, setActiveScreen] = useState("dashboard"); // dashboard, add, income, expenseList, incomeList
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  // Fetch total expense and income
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get expenses
        const expenseRes = await axios.get(`${baseurl}/api/v1/expense/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expenses = expenseRes.data;
        const expenseSum = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
        setTotalExpense(expenseSum);

        // Get incomes
        const incomeRes = await axios.get(`${baseurl}/api/v1/income/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const incomes = incomeRes.data;
        const incomeSum = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
        setTotalIncome(incomeSum);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []); // run once on mount

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* Sidebar */}
      <div>
        <Sidebar setActiveScreen={setActiveScreen} />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "24px",
          overflow: "auto",
        }}
      >
        {activeScreen === "dashboard" && (
          <div>
            <h1
              style={{
                color: "#111827",
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              Dashboard
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              {/* Total Expense */}
              <div
                style={{
                  flex: 1,
                  minWidth: "200px",
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>
                  Total Expense
                </div>
                <div style={{ color: "red", fontSize: "24px", fontWeight: "bold", marginTop: "8px" }}>
                  Rs. {totalExpense}
                </div>
              </div>

              {/* Total Income */}
              <div
                style={{
                  flex: 1,
                  minWidth: "200px",
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>Total Income</div>
                <div style={{ color: "green", fontSize: "24px", fontWeight: "bold", marginTop: "8px" }}>
                  Rs. {totalIncome}
                </div>
              </div>

              {/* Balance */}
              <div
                style={{
                  flex: 1,
                  minWidth: "200px",
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>Balance</div>
                <div style={{ color: "blue", fontSize: "24px", fontWeight: "bold", marginTop: "8px" }}>
                  Rs. {totalIncome - totalExpense}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeScreen === "add" && <AddExpense />}
        {activeScreen === "income" && <AddIncome />}
        {activeScreen === "expenseList" && <ExpenseList />}
        {activeScreen === "incomeList" && <IncomeList />}
      </div>
    </div>
  );
}
