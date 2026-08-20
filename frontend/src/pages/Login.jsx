import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Lock, Eye } from "lucide-react";
import Logo from "../components/Logo";
import api from "../api";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/api/auth/login", form);
      localStorage.setItem("donorgo_token", data.access_token);
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <Logo large />
      <p>Welcome back! Sign in to continue</p>
      <form className="auth-card" onSubmit={submit}>
        <label>Mobile Number</label>
        <div className="input-wrap"><Phone /><input placeholder="Enter your mobile number" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/></div>

        <label>Password</label>
        <div className="input-wrap"><Lock /><input type="password" placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><Eye /></div>

        <div className="row-between"><label className="check"><input type="checkbox"/> Remember me</label><span className="linkish">Forgot password?</span></div>
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary full">Sign In</button>
        <div className="divider"><span>or</span></div>
        <p className="center-text">Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}
