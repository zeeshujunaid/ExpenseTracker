import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../service/config";

function Signup() {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!fullname || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    // Signup logic here


    const response = await fetch(`${baseurl}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),   
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setError(data.message || "Signup failed");
      return;
    }else {
      // localStorage.setItem("token" , data.token);
      alert("Signup successful! Please login.");
      navigate("/");
    }
  }

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://st3.depositphotos.com/10381014/19429/v/1600/depositphotos_194297666-stock-illustration-abstract-financial-chart-with-trend.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Glass container */}
      <div
        style={{
          display: "flex",
          width: "85%",
          height: "85vh",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Left side (Form) */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 20px",
            color: "white",
            // gap: "15px",
            // transform: "scale(1.1)",
            // transformOrigin: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.0rem",
              marginBottom: "10px",
              fontWeight: "900",
              color: "#000",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              color: "#ddd",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "350px",
              fontSize: "1.2rem",
              color: "#000",
              fontWeight: "500",
              // lineHeight: "1.4",
            }}
          >
            Join us today and start your journey 
          </p>

          {/* Normal Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={{
              width: "80%",
              height: "3vh",
              padding: "14px 18px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#000",
              fontSize: "16px",
              outline: "none",
              marginBottom: "20px",
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "80%",
              height: "3vh",
              padding: "14px 18px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#000",
              fontSize: "16px",
              outline: "none",
              marginBottom: "20px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "80%",
              height: "3vh",
              padding: "14px 18px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#000",
              fontSize: "16px",
              outline: "none",
              marginBottom: "20px",
            }}
          />

          <button
            style={{
              width: "80%",
              height: "7vh",
              // padding: "14px",
              borderRadius: "10px",
              border: "none",
              fontSize: "17px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #007bff, #00bfff)",
              color: "white",
              // marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p
            style={{
              marginTop: "20px",
              fontSize: "1.0rem",
              color: "#000000ff",
            }}
          >
            Already have an account?{" "}
            <a
              href="/"
              style={{
                color: "#00bfff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </a>
          </p>
        </div>

        {/* Right side (Image) */}
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#dbdbdb60",
          }}
        >
          <img
            src="/sidecharts.png"
            alt="Signup Illustration"
            style={{
              width: "80%",
              height: "70%",
              // objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
