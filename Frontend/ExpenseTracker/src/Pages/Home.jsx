import React from "react";
import Navbar from "../Components/Navbar";
import ExpenseList from "../Components/ExpenseList";
import StatsCards from "../Components/StatsCards";

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        background: "#f0f2f5",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Stats Cards */}
      <StatsCards />

      {/* Expense List */}
      <div style={{ marginTop: "30px" }}>
        <ExpenseList />
      </div>
    </div>
  );
}
