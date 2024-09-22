import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Row } from "reactstrap";
import InputFeild from "./Input/Input"; // Assuming InputFeild is your custom component

const Login = ({ setUser }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials for simplicity
  const credentials = {
    admin: { username: "admin", password: "admin123" },
    student: { username: "student", password: "student123" },
  };

  const handleLogin = () => {
    const { username, password } = loginData;

    // Clear any previous errors
    setError("");

    // Validation: Check if fields are not empty
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    // Validation: Check if credentials are correct
    if (
      username === credentials.admin.username &&
      password === credentials.admin.password
    ) {
      setUser({ role: "admin" });
      navigate("/admin");
    } else if (
      username === credentials.student.username &&
      password === credentials.student.password
    ) {
      setUser({ role: "student" });
      navigate("/student");
    } else {
      setError("Invalid username or password.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="login_screen_container">
      <Row className="login_card">
        <div className="login_greeting_con">
          <div>
            {" "}
            <Row style={{color:'teal'}}>Kongu Arts And Science College</Row>
            <br />
            Welcome back!
          </div>
          <div className="greet_info">Please login to your account</div>
        </div>
        <div className="login_inputs_con">
          <div className="login_eye_con_fixed">
            <InputFeild
              type="text"
              placeholder="Username"
              name="Username"
              width={"100%"}
              classNameInLabel="hr_login_password_field_label login_password"
              value={loginData.username}
              onChange={(key, value) => handleInputChange("username", value)} // Updated onChange handler
            />
          </div>
          <div className="login_eye_con_fixed">
            <InputFeild
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              name="Password"
              value={loginData.password}
              classNameInLabel="hr_login_password_field_label login_password"
              width={"100%"}
              onChange={(key, value) => handleInputChange("password", value)} // Updated onChange handler
            />
            <span
              className="toggle_password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div>
            {error && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {error}
              </p>
            )}
          </div>
          <Row
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div className="login_button" onClick={handleLogin}>
              Login
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default Login;
