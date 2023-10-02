import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { UserSignup } from "../../Api/Services/userAuth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    setBackendError("");
  }, [email, password, name]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !name ? "Please enter your name." : "",
      email: !email ? "Please enter your email." : !validateEmail(email) ? "Please enter a valid email address." : "",
      password: !password ? "Please enter your password." : password.length <= 6 ? "Password must be at least 7 characters long." : "",
    };

    setErrors(newErrors);

    // Check if there are any validation errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);

    try {
      const response = await UserSignup(email, password, name);

      if (response?.status === 201) {
        console.log(response,"mmm");
        setSuccess(response?.data?.message);
        setLoading(false);
        Navigate("/login");
      } else {
        setBackendError(response?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setBackendError(err?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="cover">
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="error-message">{errors.name}</div>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-message">{errors.email}</div>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message">{errors.password}</div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Submit"}
          </button>
        </form>
        {success && <div className="success-message">{success}</div>}
        {backendError && <div className="error-message">{backendError}</div>}

        <div className="reg-link">
          Already have an account?{" "}
          <span onClick={() => Navigate("/login")}>Click here</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
