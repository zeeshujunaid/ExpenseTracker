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
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import { 
  FaChartLine, 
  FaMoneyBillWave, 
  FaReceipt, 
  FaWallet, 
  FaArrowUp, 
  FaArrowDown,
  FaPiggyBank
} from "react-icons/fa";

export default function Dashboard() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

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
        setExpenseCategoryData(expenses);

        const { data: incomes } = await axios.get(
          `${baseurl}/api/v1/income/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const incomeSum = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
        setTotalIncome(incomeSum);
        setIncomeCategoryData(incomes);

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid transparent', 
            borderTop: '4px solid white', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }} />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!activeScreen) return null;

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
      <Sidebar setActiveScreen={setActiveScreen} />
      <div style={{ 
        flex: 1, 
        marginLeft: 280, 
        padding: "30px", 
        overflow: "auto",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}>
        {activeScreen === "dashboard" && (
          <>
            {/* Header */}
            <div style={{
              marginBottom: "30px"
            }}>
              <h1 style={{
                fontSize: "36px",
                fontWeight: "700",
                marginBottom: "8px",
                color: "#2d3748",
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}>
                <FaChartLine style={{ color: "#4CAF50" }} />
                Financial Dashboard
              </h1>
              <p style={{
                color: "#718096",
                fontSize: "16px",
                margin: 0
              }}>
                Overview of your income, expenses, and financial health
              </p>
            </div>

            {/* Summary Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "30px"
            }}>
              <SummaryCard 
                title="Total Income" 
                amount={totalIncome} 
                icon={<FaMoneyBillWave />}
                color="#2196F3"
                trend="up"
              />
              <SummaryCard 
                title="Total Expenses" 
                amount={totalExpense} 
                icon={<FaReceipt />}
                color="#F44336"
                trend="down"
              />
              <SummaryCard 
                title="Current Balance" 
                amount={balance} 
                icon={<FaWallet />}
                color={balance >= 0 ? "#4CAF50" : "#FF9800"}
                trend={balance >= 0 ? "up" : "down"}
              />
            </div>

            {/* Charts Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "30px",
              marginBottom: "30px"
            }}>
              {/* Main Chart */}
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0"
              }}>
                <h2 style={{ 
                  margin: "0 0 20px 0", 
                  color: "#2d3748",
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaChartLine />
                  Monthly Financial Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F44336" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#718096"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#718096"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="Income"
                      stroke="#2196F3"
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="Expense"
                      stroke="#F44336"
                      fillOpacity={1}
                      fill="url(#colorExpense)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Income Distribution */}
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                <h2 style={{ 
                  margin: "0 0 20px 0", 
                  color: "#2d3748",
                  fontSize: "18px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaMoneyBillWave />
                  Income Sources
                </h2>
                <div style={{ 
                  flex: 1, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  minHeight: "250px",
                  position: "relative"
                }}>
                  <Donutchart data={incomeCategoryData} type="income" />
                </div>
                <div style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: "#f7fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#4a5568"
                  }}>
                    <span>Total Income:</span>
                    <span style={{ fontWeight: "600", color: "#2196F3" }}>
                      ₹{totalIncome.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Charts Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px"
            }}>
              {/* Expense Distribution */}
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
                position: "relative"
              }}>
                <h2 style={{ 
                  margin: "0 0 20px 0", 
                  color: "#2d3748",
                  fontSize: "18px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaReceipt />
                  Expense Categories
                </h2>
                <div style={{ 
                  height: "250px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <Donutchart data={expenseCategoryData} type="expense" />
                </div>
                <div style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: "#f7fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#4a5568"
                  }}>
                    <span>Total Expenses:</span>
                    <span style={{ fontWeight: "600", color: "#F44336" }}>
                      ₹{totalExpense.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Comparison */}
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0"
              }}>
                <h2 style={{ 
                  margin: "0 0 20px 0", 
                  color: "#2d3748",
                  fontSize: "18px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaChartLine />
                  Income vs Expenses
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#718096"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#718096"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                    />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: "10px"
                      }}
                    />
                    <Bar 
                      dataKey="Income" 
                      fill="#2196F3" 
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                      name="Income"
                    />
                    <Bar 
                      dataKey="Expense" 
                      fill="#F44336" 
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                      name="Expense"
                    />
                  </BarChart>
                </ResponsiveContainer>
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

// Updated Summary Card Component without animations
const SummaryCard = ({ title, amount, icon, color, trend, isPercentage = false }) => (
  <div style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
    position: "relative",
    overflow: "hidden"
  }}>
    {/* Accent bar */}
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: color
    }} />
    
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "12px"
    }}>
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        background: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: color
      }}>
        {icon}
      </div>
      <div style={{
        color: trend === "up" ? "#4CAF50" : "#F44336",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "2px"
      }}>
        {trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
      </div>
    </div>
    
    <div style={{ fontWeight: "500", color: "#718096", fontSize: "13px" }}>
      {title}
    </div>
    <div style={{ 
      fontWeight: "600", 
      fontSize: "22px", 
      color: "#2d3748", 
      marginTop: "6px" 
    }}>
      {isPercentage ? amount : `₹${typeof amount === 'number' ? amount.toLocaleString() : amount}`}
    </div>
  </div>
);