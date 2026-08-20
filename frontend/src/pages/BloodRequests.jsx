import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function BloodRequests(){
  const [items,setItems]=useState([]);
  const load=()=>api.get("/api/blood-requests").then(r=>setItems(r.data));
  useEffect(()=>{load()},[]);
  return (
    <div className="page-shell">
      <div className="page-head"><h1>Open Blood Requests</h1><Link to="/dashboard">← Dashboard</Link></div>
      <div className="result-grid">
        {items.map(x=><article className="card" key={x.id}>
          <div className="request-top"><h3>{x.patient_name}</h3><span className={`urgency ${x.urgency}`}>{x.urgency}</span></div>
          <div className="blood-badge">{x.blood_group}</div>
          <p><strong>{x.units}</strong> unit(s) required</p>
          <p>{x.hospital}</p>
          <p>{x.city}{x.state ? `, ${x.state}` : ""}</p>
          <p>Contact: {x.contact_number}</p>
          {x.notes && <p>{x.notes}</p>}
        </article>)}
      </div>
      {items.length===0 && <p className="muted">No open requests at the moment.</p>}
    </div>
  )
}
