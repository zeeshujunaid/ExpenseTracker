import React, { useState } from "react";

export default function Sidebar({ setActiveScreen }) {
  const [hovered, setHovered] = useState(null);
  const buttons = [
  { label: "Dashboard", screen: "dashboard" },
  { label: "Add Expense", screen: "add" },
  { label: "Add Income", screen: "income" },
  { label: "Expense List", screen: "expenseList" },
  { label: "Income List", screen: "incomeList" },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        height: '100vh',
        width: '250px',
        backgroundColor: '#1f2937',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Expense Tracker
      </h1>

      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => setActiveScreen(btn.screen)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: 'left',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '8px',
            backgroundColor: hovered === index ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
