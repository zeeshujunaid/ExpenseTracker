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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaChartLine,
  FaReceipt,
  FaTrash,
  FaEdit,
  FaFilter,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseurl}/api/v1/expense/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const expenseData = res.data;

        // Monthly data for line chart
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

        const monthlyData = months.map((month, idx) => ({
          month,
          Expense: expenseData
            .filter((i) => new Date(i.date).getMonth() === idx)
            .reduce((sum, i) => sum + Number(i.amount), 0),
        }));

        // Category data for pie chart
        const categoryMap = {};
        expenseData.forEach((exp) => {
          if (categoryMap[exp.category]) {
            categoryMap[exp.category] += Number(exp.amount);
          } else {
            categoryMap[exp.category] = Number(exp.amount);
          }
        });

        const categoryChartData = Object.keys(categoryMap).map(
          (category, index) => ({
            name: category,
            value: categoryMap[category],
            color: COLORS[index % COLORS.length],
          })
        );

        setExpenses(expenseData);
        setChartData(monthlyData);
        setCategoryData(categoryChartData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${baseurl}/api/v1/expense/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(expenses.filter((inc) => inc._id !== id));
      } catch (error) {
        console.error("Error deleting income:", error);
      }
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "18px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #fff",
              borderRadius: "50%",
              margin: "0 auto 10px",
            }}
          />
          Loading expenses...
        </div>
      </div>
    );
  }

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
          flex: 1, 
        marginLeft: 280, 
        padding: "30px", 
        overflow: "auto",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",

        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#2d3748",
                  fontSize: "28px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <FaReceipt style={{ color: "#4CAF50" }} />
                Expense Overview
              </h1>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#718096",
                  fontSize: "14px",
                }}
              >
                Track and manage your expenses
              </p>
            </div>

            <div
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Total Expenses
              </div>
              <div style={{ fontSize: "24px", fontWeight: "600" }}>
                ₹{getTotalExpenses().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "8px",
            }}
          >
            {[
              { id: "list", label: "Expense List", icon: FaReceipt },
              { id: "trends", label: "Trends", icon: FaChartLine },
              { id: "categories", label: "Categories", icon: FaFilter },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: activeTab === tab.id ? "#4CAF50" : "transparent",
                  color: activeTab === tab.id ? "white" : "#718096",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: activeTab === "list" ? "1fr" : "1fr 1fr",
            alignItems: "start",
          }}
        >
          {/* Expense List */}
          {activeTab === "list" && (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2
                style={{
                  margin: "0 0 20px 0",
                  color: "#2d3748",
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaReceipt />
                Recent Expenses
              </h2>

              {expenses.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "#718096",
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                    💸
                  </div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#4a5568" }}>
                    No expenses yet
                  </h3>
                  <p>Start adding expenses to see them here</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  {expenses.map((exp) => (
                    <div
                      key={exp._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px",
                        borderRadius: "8px",
                        background: "#f7fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "8px",
                            background: "#4CAF50",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            color: "white",
                          }}
                        >
                          {exp.icon}
                        </div>
                        <div>
                          <h3
                            style={{
                              margin: "0 0 4px 0",
                              color: "#2d3748",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            {exp.category}
                          </h3>
                          <p
                            style={{
                              margin: 0,
                              color: "#718096",
                              fontSize: "13px",
                            }}
                          >
                            {new Date(exp.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#2d3748",
                          }}
                        >
                          ₹{Number(exp.amount).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e53e3e",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "6px",
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Charts */}
          {(activeTab === "trends" || activeTab === "categories") && (
            <>
              {/* Monthly Trend Chart */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "25px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 20px 0",
                    color: "#2d3748",
                    fontSize: "20px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaChartLine />
                  Monthly Expense Trend
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#718096" fontSize={12} />
                    <YAxis stroke="#718096" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Expense"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      dot={{ fill: "#4CAF50", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "25px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 20px 0",
                    color: "#2d3748",
                    fontSize: "20px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaFilter />
                  Expense by Category
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString()}`,
                        "Amount",
                      ]}
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
