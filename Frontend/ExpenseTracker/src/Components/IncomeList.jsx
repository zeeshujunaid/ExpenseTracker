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
  Cell
} from "recharts";
import { FaChartLine, FaMoneyBillWave, FaTrash, FaFilter, FaDollarSign } from "react-icons/fa";

export default function IncomeList() {
  const [income, setIncome] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseurl}/api/v1/income/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const incomeData = res.data;

        // Monthly data for line chart
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const monthlyData = months.map((month, idx) => ({
          month,
          Income: incomeData  
            .filter((i) => new Date(i.date).getMonth() === idx)
            .reduce((sum, i) => sum + Number(i.amount), 0),
        }));

        // Category data for pie chart
        const categoryMap = {};
        incomeData.forEach(inc => {
          if (categoryMap[inc.category]) {
            categoryMap[inc.category] += Number(inc.amount);
          } else {
            categoryMap[inc.category] = Number(inc.amount);
          }
        });

        const categoryChartData = Object.keys(categoryMap).map((category, index) => ({
          name: category,
          value: categoryMap[category],
          color: COLORS[index % COLORS.length]
        }));

        setIncome(incomeData);
        setChartData(monthlyData);
        setCategoryData(categoryChartData);

      } catch (error) {
        console.error("Error fetching income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${baseurl}/api/v1/income/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncome(income.filter(inc => inc._id !== id));
      } catch (error) {
        console.error("Error deleting income:", error);
      }
    }
  };

  const getTotalIncome = () => {
    return income.reduce((sum, inc) => sum + Number(inc.amount), 0);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #fff', 
            borderRadius: '50%', 
            margin: '0 auto 10px'
          }} />
          Loading income...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "30px", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header Section */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "25px",
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #e2e8f0"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: "#2d3748", 
              fontSize: "28px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <FaMoneyBillWave style={{ color: "#2196F3" }} />
              Income Overview
            </h1>
            <p style={{ 
              margin: "5px 0 0 0", 
              color: "#718096",
              fontSize: "14px"
            }}>
              Track and manage your income sources
            </p>
          </div>
          
          <div style={{
            background: "#2196F3",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Total Income</div>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>
              ₹{getTotalIncome().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "8px"
        }}>
          {[
            { id: "list", label: "Income List", icon: FaMoneyBillWave },
            { id: "trends", label: "Trends", icon: FaChartLine },
            { id: "categories", label: "Sources", icon: FaFilter }
          ].map(tab => (
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
                background: activeTab === tab.id ? "#2196F3" : "transparent",
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
      <div style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: activeTab === "list" ? "1fr" : "1fr 1fr",
        alignItems: "start"
      }}>
        
        {/* Income List */}
        {activeTab === "list" && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              margin: "0 0 20px 0", 
              color: "#2d3748",
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <FaMoneyBillWave />
              Recent Income
            </h2>

            {income.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#718096"
              }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>💵</div>
                <h3 style={{ margin: "0 0 8px 0", color: "#4a5568" }}>
                  No income yet
                </h3>
                <p>Start adding income to see them here</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gap: "12px",
                maxHeight: "500px",
                overflowY: "auto"
              }}>
                {income.map((inc) => (
                  <div
                    key={inc._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px",
                      borderRadius: "8px",
                      background: "#f7fafc",
                      border: "1px solid #e2e8f0"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "8px",
                        background: "#2196F3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        color: "white"
                      }}>
                        {inc.icon}
                      </div>
                      <div>
                        <h3 style={{ 
                          margin: "0 0 4px 0", 
                          color: "#2d3748",
                          fontWeight: "600",
                          fontSize: "16px"
                        }}>
                          {inc.category}
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          color: "#718096",
                          fontSize: "13px"
                        }}>
                          {new Date(inc.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2196F3"
                      }}>
                        ₹{Number(inc.amount).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDelete(inc._id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#e53e3e",
                          cursor: "pointer",
                          padding: "6px",
                          borderRadius: "6px"
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
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0"
            }}>
              <h2 style={{ 
                margin: "0 0 20px 0", 
                color: "#2d3748",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <FaChartLine />
                Monthly Income Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
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
                      borderRadius: "6px"
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Income']}
                  />
                  <Line
                    type="monotone"
                    dataKey="Income"
                    stroke="#2196F3"
                    strokeWidth={2}
                    dot={{ fill: '#2196F3', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Income Sources Distribution */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0"
            }}>
              <h2 style={{ 
                margin: "0 0 20px 0", 
                color: "#2d3748",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <FaFilter />
                Income by Source
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{
                      background: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}