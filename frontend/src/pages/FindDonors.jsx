import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function FindDonors() {
  const [filters,setFilters]=useState({blood_group:"",city:"",state:""});
  const [donors,setDonors]=useState([]);
  const [loading,setLoading]=useState(false);

  const search=async e=>{
    e.preventDefault(); setLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([,v])=>v));
    const {data}=await api.get("/api/donors",{params});
    setDonors(data); setLoading(false);
  };

  return (
    <div className="page-shell">
      <div className="page-head"><h1>Find Donors</h1><Link to="/dashboard">← Dashboard</Link></div>
      <form className="filter-card" onSubmit={search}>
        <select value={filters.blood_group} onChange={e=>setFilters({...filters,blood_group:e.target.value})}>
          <option value="">Any blood group</option>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(x=><option key={x}>{x}</option>)}
        </select>
        <input placeholder="City" value={filters.city} onChange={e=>setFilters({...filters,city:e.target.value})}/>
        <input placeholder="State" value={filters.state} onChange={e=>setFilters({...filters,state:e.target.value})}/>
        <button className="btn btn-primary">Search Donors</button>
      </form>
      {loading && <p>Searching...</p>}
      <div className="result-grid">
        {donors.map(d=><article className="card" key={d.id}>
          <h3>{d.full_name}</h3>
          <div className="blood-badge">{d.blood_group}</div>
          <p>{d.city || "City not set"}{d.state ? `, ${d.state}` : ""}</p>
          <p>Mobile: {d.mobile}</p>
          <p className="available">Available</p>
        </article>)}
      </div>
      {!loading && donors.length===0 && <p className="muted">Use the filters above to search available donors.</p>}
    </div>
  );
}
