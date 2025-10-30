import React, { useState } from "react";
import { 
  FaTachometerAlt, 
  FaPlusCircle, 
  FaMoneyBillWave, 
  FaReceipt, 
  FaListAlt,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveScreen }) {
  const [activeButton, setActiveButton] = useState("dashboard");

    const navigate = useNavigate();

  
  const buttons = [
    { 
      label: "Dashboard", 
      screen: "dashboard", 
      icon: <FaTachometerAlt /> 
    },
    { 
      label: "Add Expense", 
      screen: "add", 
      icon: <FaPlusCircle /> 
    },
    { 
      label: "Add Income", 
      screen: "income", 
      icon: <FaMoneyBillWave /> 
    },
    { 
      label: "Expense List", 
      screen: "expenseList", 
      icon: <FaReceipt /> 
    },
    { 
      label: "Income List", 
      screen: "incomeList", 
      icon: <FaListAlt /> 
    },
  ];

  const handleButtonClick = (screen) => {
    setActiveScreen(screen);
    setActiveButton(screen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px 20px',
        height: '100vh',
        width: '280px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          <FaChartLine />
        </div>
        <div>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            margin: 0,
            color: 'white'
          }}>
            ExpenseTracker
          </h1>
          <p style={{ 
            fontSize: '11px', 
            margin: 0, 
            opacity: 0.8,
            marginTop: '2px'
          }}>
            Track Your Money
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1
      }}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn.screen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: activeButton === btn.screen 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontWeight: activeButton === btn.screen ? '600' : '400',
              fontSize: '14px'
            }}
          >
            <div style={{
              fontSize: '16px',
              opacity: activeButton === btn.screen ? 1 : 0.8
            }}>
              {btn.icon}
            </div>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '15px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            width: '100%',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <FaSignOutAlt style={{ fontSize: '14px' }} />
          Logout
        </button>
      </div>

      {/* User Info Footer */}
      <div style={{
        marginTop: '12px',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ 
          fontSize: '11px', 
          opacity: 0.8,
          marginBottom: '4px'
        }}>
          Welcome back,
        </div>
        <div style={{ 
          fontSize: '13px', 
          fontWeight: '600',
          color: 'white'
        }}>
          User
        </div>
      </div>
    </div>
  );
}