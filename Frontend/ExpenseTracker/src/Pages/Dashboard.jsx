import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "black" }}>
      <h1 style={{color:"red",}}>Welcome to Expense Tracker 💸</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default Dashboard;
