import { Link } from "react-router-dom";

function Home() {
  const checktoken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("Token exists: " + token);
      console.log("Token:", token);
    } else {
      alert("No token found. Please login.");
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "black" }}>
      <h1 style={{color:"red",}}>Welcome to Expense Tracker 💸</h1>
      <Link to="/login">Go to Login</Link>
      <button onClick={checktoken}>click</button>
    </div>
  );
}

export default Home;
