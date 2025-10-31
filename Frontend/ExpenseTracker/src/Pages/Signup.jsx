import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../service/config";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 👇 When user selects image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreview(URL.createObjectURL(file)); // image preview
    }
  };

  const handleSignup = async () => {
    if (!fullname || !email || !password || !profileImg) {
      setError("Please fill in all fields including image");
      return;
    }
    setError("");

    try {
      // 1️⃣ Upload image to Cloudinary
      const data = new FormData();
      data.append("file", profileImg);
      data.append("upload_preset", "YumMapPics");
      data.append("cloud_name", "dudx3of1n");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dudx3of1n/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await cloudRes.json();
      console.log("Cloudinary URL:", cloudData.secure_url);

      // 2️⃣ Send signup data to backend
      const response = await fetch(`${baseurl}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          password,
          profileImgurl: cloudData.secure_url,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError(result.message || "Signup failed");
        return;
      } else {
        alert("Signup successful! Please login.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

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
        {/* Left Form Section */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 20px",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "10px",
              fontWeight: "900",
              color: "#000",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              color: "#000",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "350px",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            Join us today and start your journey
          </p>

          {/* Image Input with Preview */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label
              htmlFor="fileInput"
              style={{
                display: "block",
                fontWeight: "600",
                color: "#000",
                marginBottom: "8px",
              }}
            >
              Upload Profile Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "10px",color:"red", }}
            />
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #007bff",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button style={buttonStyle} onClick={handleSignup}>
            Sign Up
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}

          <p
            style={{
              marginTop: "20px",
              fontSize: "1rem",
              color: "#000",
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

        {/* Right Image Section */}
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
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
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
};

const buttonStyle = {
  width: "80%",
  height: "7vh",
  borderRadius: "10px",
  border: "none",
  fontSize: "17px",
  fontWeight: "600",
  background: "linear-gradient(135deg, #007bff, #00bfff)",
  color: "white",
  cursor: "pointer",
};

export default Signup;
