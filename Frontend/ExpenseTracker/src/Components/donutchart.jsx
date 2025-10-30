import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Donutchart = ({ data, type = "income" }) => {
  // Handle undefined or null data
  if (!data || !Array.isArray(data)) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#718096',
        fontSize: '14px'
      }}>
        No {type} data available
      </div>
    );
  }

  // Calculate category totals
  const categoryMap = {};
  data.forEach(item => {
    if (item && item.category && item.amount) {
      if (categoryMap[item.category]) {
        categoryMap[item.category] += Number(item.amount);
      } else {
        categoryMap[item.category] = Number(item.amount);
      }
    }
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  const chartData = Object.keys(categoryMap).map((category, index) => ({
    name: category,
    value: categoryMap[category],
    color: COLORS[index % COLORS.length]
  }));

  // Handle empty data
  if (chartData.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#718096',
        fontSize: '14px'
      }}>
        No {type} data available
      </div>
    );
  }

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
            formatter={(value, entry, index) => (
              <span style={{ color: '#4a5568', fontSize: '12px' }}>
                {chartData[index]?.name}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center total display */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '12px', color: '#718096' }}>
          Total {type === 'income' ? 'Income' : 'Expenses'}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
          ₹{total.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Donutchart;