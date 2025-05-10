import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { addData, saveCurrentUserInLS } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    phone_number: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addData("user/register", form);
      if (result?.success !== false) {
        saveCurrentUserInLS(form);
        navigate("/home");
      } else {
        setError("Registration failed.");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className="center-content">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Register</h2>
        <input name="user_name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone_number" placeholder="Phone" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}