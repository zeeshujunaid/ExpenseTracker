import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [FullName , setFullName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
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
          justifyContent: "center",
          alignItems: "center",
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
            Welcome To Expense Tracker
          </h1>
          <h3
            style={{ color: "black", fontSize: "24px", marginBottom: "30px" }}
          >
            Please enter your details to Signup
          </h3>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>

            <label style={{ color: "black", fontSize: "2.2vh" }}>Name</label>
            <input
              type="text"
              placeholder="Enter your FullName"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
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



            <label style={{ color: "black", fontSize: "2.2vh" }}>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              SignUp
            </button>

            <div
              style={{ marginTop: "20px", color: "black", fontSize: "2.2vh" }}
            >
              Alredy have an account{" "}
              <a href="/" style={{ color: "blue" }}>
                Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          position: "relative", 
          width: "50%",
          height: "100vh",
          backgroundImage: `url("/bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(248, 249, 253, 0.3)", 
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        ></div>

        {/* Any content you want on top of the blurred image */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Your content here */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
