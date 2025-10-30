import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import AddExpense from "../Components/AddExpense";
import AddIncome from "../Components/AddIncome";
import ExpenseList from "../Components/ExpenseList";
import IncomeList from "../Components/IncomeList";
import axios from "axios";
import baseurl from "../service/config";
import Donutchart from "../Components/donutchart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch Expenses
        const { data: expenses } = await axios.get(
          `${baseurl}/api/v1/expense/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const expenseSum = expenses.reduce(
          (sum, e) => sum + Number(e.amount),
          0
        );
        setTotalExpense(expenseSum);

        // Fetch Incomes
        const { data: incomes } = await axios.get(
          `${baseurl}/api/v1/income/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const incomeSum = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
        setTotalIncome(incomeSum);

        // Prepare Chart Data (Monthly)
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const data = months.map((month, idx) => ({
          month,
          Income: incomes
            .filter((i) => new Date(i.date).getMonth() === idx)
            .reduce((sum, i) => sum + Number(i.amount), 0),
          Expense: expenses
            .filter((e) => new Date(e.date).getMonth() === idx)
            .reduce((sum, e) => sum + Number(e.amount), 0),
        }));

        setIncomeCategoryData(incomes);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!activeScreen) return null;

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
      <Sidebar setActiveScreen={setActiveScreen} />
      <div style={{ flex: 1, marginLeft: 250, padding: 24, overflow: "auto" }}>
        {activeScreen === "dashboard" && (
          <>
            <h1
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 24,
                color: "#000",
              }}
            >
              Dashboard
            </h1>

            {/* Totals */}
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 24,
                color: "#000",
              }}
            >
              <Card title="Total Expense" amount={totalExpense} color="red" />
              <Card title="Total Income" amount={totalIncome} color="green" />
              <Card
                title="Balance"
                amount={totalIncome - totalExpense}
                color="blue"
              />
            </div>

            {/* Chart */}
            <div
              style={{
                background: "#000", // black background
                borderRadius: 12,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                marginBottom: 24,
                padding: 20,
              }}
            >
              <h2 style={{ marginBottom: 16, color: "#fff" }}>
                Monthly Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "none",
                      color: "#fff",
                    }}
                    formatter={(value) => `Rs. ${value}`}
                  />
                  <Legend wrapperStyle={{ color: "#fff" }} />
                  {/* Bars */}
                  <Bar
                    dataKey="Income"
                    stackId="a"
                    fill="#4CAF50"
                    barSize={20}
                  />{" "}
                  {/* green */}
                  <Bar
                    dataKey="Expense"
                    stackId="a"
                    fill="#F44336"
                    barSize={20}
                  />{" "}
                  {/* red */}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "coloum",
                  jsustifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Donutchart income={incomeCategoryData} />
              </div>
            </div>
          </>
        )}

        {activeScreen === "add" && <AddExpense />}
        {activeScreen === "income" && <AddIncome />}
        {activeScreen === "expenseList" && <ExpenseList />}
        {activeScreen === "incomeList" && <IncomeList />}
      </div>
    </div>
  );
}

// reusable Cards
const Card = ({ title, amount, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: 180,
      background: "white",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
    <div style={{ fontWeight: "bold", fontSize: 24, color, marginTop: 8 }}>
      Rs. {amount}
    </div>
  </div>
);
