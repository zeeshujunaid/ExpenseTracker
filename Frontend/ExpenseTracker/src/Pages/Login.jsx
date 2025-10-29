import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const naviagte = useNavigate();

    const handleLogin = async () => {
        email.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError("");
    
        
        // Simulate successful login
    }


  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "50px",
          }}
        >
          <h1
            style={{
              fontFamily: "monospace",
              fontSize: "36px",
              color: "black",
            }}
          >
            Expense Tracker
          </h1>
        </div>

        {/* Centered Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "50px",
            gap: "10px",
            zoom: "1.1",
          }}
        >
          <h1
            style={{ color: "black", fontSize: "48px", marginBottom: "10px" }}
          >
            Welcome Back
          </h1>
          <h3
            style={{ color: "black", fontSize: "24px", marginBottom: "30px" }}
          >
            Please enter your details to Login
          </h3>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
            <label style={{ color: "black", fontSize: "2.2vh" }}>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              style={{
                width: "32vw",
                height: "4vh",
                color: "black",
                borderRadius: "8px",
                border: "1px solid #acababff",
                paddingLeft: "12px",
                fontSize: "1rem",
                backgroundColor: "#f0f0f0",
                outline: "none",
              }}
            />

            <label style={{ color: "black", fontSize: "2.2vh" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: "32vw",
                height: "4vh",
                color: "black",
                borderRadius: "8px",
                border: "1px solid #acababff",
                paddingLeft: "12px",
                fontSize: "1rem",
                backgroundColor: "#f0f0f0",
                outline: "none",
              }}
            />

            <button
              style={{
                width: "33vw",
                height: "55px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ac9ef8ff",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <div
              style={{ marginTop: "20px", color: "black", fontSize: "2.2vh" }}
            >
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "blue" }}>
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fdff",
          gap: "20vh",
        }}
      >
        <img
          src="/expense.png"
          alt="Expense Tracker Illustration"
          style={{ width: "30vw" }}
        />

        <img
          src="/chart.png"
          alt="Expense Tracker Illustration"
          style={{ width: "25vw" }}
        />
      </div>
    </div>
  );
}

export default Login;
