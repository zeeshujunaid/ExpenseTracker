import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699", "#66CCFF"];

export default function IncomeDonutChart({ income }) {
  const data = income.map((i, index) => ({
    name: `item-${index}`,
    value: Number(i.amount),
  }));

  const totalIncome = data.reduce((sum, i) => sum + i.value, 0);

  return (
    <div
      style={{
        background: "#fff",
        width: "100%",
        borderRadius: 20,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        marginTop: 24,
        padding: 30,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#333" }}>
        Income Donut
      </h2>
      <div style={{ position: "relative", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={3} 
              label={({ value }) => `Rs. ${value}`} 
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `Rs. ${value}`}
              contentStyle={{
                backgroundColor: "#333",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Total */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: 16, color: "#666" }}>Total</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
            Rs. {totalIncome}
          </div>
        </div>
      </div>
    </div>
  );
}
