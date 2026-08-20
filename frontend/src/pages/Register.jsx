import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../api";

const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    full_name:"", mobile:"", gender:"", date_of_birth:"",
    blood_group:"", password:"", confirm_password:"",
    address:"", city:"", state:"", pincode:"", role:"both", donor_type:"individual"
  });
  const [error, setError] = useState("");

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const locate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      () => alert("Location permission granted. Enter your address for accurate matching."),
      () => alert("Location permission was not granted.")
    );
  };

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    const payload = {...form};
    delete payload.confirm_password;
    if (!payload.date_of_birth) delete payload.date_of_birth;

    try {
      const {data} = await api.post("/api/auth/register", payload);
      localStorage.setItem("donorgo_token", data.access_token);
      nav("/dashboard");
    } catch(err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={submit}>
        <div className="register-head">
          <div><h2>Create Account</h2><p>Join the community saving lives</p></div>
          <Logo />
        </div>

        <h4>Personal Information</h4>
        <label>Full Name</label>
        <input name="full_name" value={form.full_name} onChange={change} placeholder="Enter your full name" required />
        <label>Mobile Number</label>
        <input name="mobile" value={form.mobile} onChange={change} placeholder="10 digit mobile number" required />
        <div className="form-grid-2">
          <div><label>Gender</label><select name="gender" value={form.gender} onChange={change}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></div>
          <div><label>Date of Birth</label><input type="date" name="date_of_birth" value={form.date_of_birth} onChange={change}/></div>
        </div>
        <label>Blood Group</label>
        <select name="blood_group" value={form.blood_group} onChange={change} required>
          <option value="">Select blood group</option>
          {bloodGroups.map(x=><option key={x}>{x}</option>)}
        </select>

        <h4>Security</h4>
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={change} placeholder="Create a strong password (min 8 characters)" required/>
        <label>Confirm Password</label>
        <input type="password" name="confirm_password" value={form.confirm_password} onChange={change} placeholder="Confirm your password" required/>

        <h4>Location</h4>
        <button type="button" className="location-btn" onClick={locate}>⌖ Location will be requested when you click here</button>
        <label>Address</label>
        <input name="address" value={form.address} onChange={change} placeholder="Street address"/>
        <div className="form-grid-3">
          <input name="city" value={form.city} onChange={change} placeholder="City"/>
          <input name="state" value={form.state} onChange={change} placeholder="State"/>
          <input name="pincode" value={form.pincode} onChange={change} placeholder="6 digits"/>
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary full">Complete Registration</button>
        <p className="center-text">Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  );
}
