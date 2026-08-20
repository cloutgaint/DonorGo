import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Home, Users, Droplet, LogOut } from "lucide-react";
import Logo from "../components/Logo";
import api from "../api";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const nav=useNavigate();

  useEffect(()=>{
    api.get("/api/users/me")
      .then(r=>setUser(r.data))
      .catch(()=>{localStorage.removeItem("donorgo_token"); nav("/login")});
  },[]);

  const logout=()=>{
    localStorage.removeItem("donorgo_token");
    nav("/login");
  };

  return (
    <div className="dashboard-page">
      <Logo large />
      <h1>Welcome to Your Dashboard</h1>
      <p>{user ? `Hello ${user.full_name}. Start connecting with donors and seekers.` : "Loading your profile..."}</p>

      <section className="dashboard-card">
        <CheckCircle2 className="success-icon"/>
        <h2>Payment Successful!</h2>
        <p>Your DonorGO subscription has been activated successfully.</p>
        <div className="status-box">
          <span>Subscription Status</span>
          <strong>{user?.subscription_status === "active" ? "Active" : user?.subscription_status || "Loading"}</strong>
        </div>
      </section>

      <div className="dashboard-actions">
        <Link className="action-card" to="/"><Home/><div><strong>Go to Home</strong><span>Return to landing page</span></div></Link>
        <Link className="action-card" to="/find-donors"><Users/><div><strong>Find Donors</strong><span>Search available donors</span></div></Link>
        <Link className="action-card" to="/request-blood"><Droplet/><div><strong>Request Blood</strong><span>Create an emergency request</span></div></Link>
        <Link className="action-card" to="/requests"><Droplet/><div><strong>Open Requests</strong><span>View current blood requests</span></div></Link>
      </div>

      <p>More features coming soon. Stay tuned!</p>
      <button onClick={logout} className="btn btn-primary"><LogOut/> Logout</button>
    </div>
  );
}
