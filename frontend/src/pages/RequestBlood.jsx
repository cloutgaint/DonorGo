import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function RequestBlood() {
  const nav=useNavigate();
  const [form,setForm]=useState({
    patient_name:"",blood_group:"",units:1,hospital:"",city:"",state:"",
    contact_number:"",urgency:"urgent",notes:""
  });
  const [error,setError]=useState("");
  const change=e=>setForm({...form,[e.target.name]:e.target.value});

  const submit=async e=>{
    e.preventDefault(); setError("");
    try {
      await api.post("/api/blood-requests",{...form,units:Number(form.units)});
      alert("Blood request created successfully.");
      nav("/requests");
    } catch(err) {
      setError(err.response?.data?.detail || "Could not create request");
    }
  };

  return (
    <div className="page-shell narrow">
      <div className="page-head"><h1>Request Blood</h1><Link to="/dashboard">← Dashboard</Link></div>
      <form className="request-card" onSubmit={submit}>
        <label>Patient Name</label><input name="patient_name" value={form.patient_name} onChange={change} required/>
        <label>Blood Group</label>
        <select name="blood_group" value={form.blood_group} onChange={change} required>
          <option value="">Select blood group</option>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(x=><option key={x}>{x}</option>)}
        </select>
        <label>Units Required</label><input type="number" min="1" max="20" name="units" value={form.units} onChange={change}/>
        <label>Hospital</label><input name="hospital" value={form.hospital} onChange={change} required/>
        <div className="form-grid-2">
          <div><label>City</label><input name="city" value={form.city} onChange={change} required/></div>
          <div><label>State</label><input name="state" value={form.state} onChange={change}/></div>
        </div>
        <label>Contact Number</label><input name="contact_number" value={form.contact_number} onChange={change} required/>
        <label>Urgency</label>
        <select name="urgency" value={form.urgency} onChange={change}>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
        <label>Notes</label><textarea name="notes" value={form.notes} onChange={change} rows="4"/>
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary full">Create Blood Request</button>
      </form>
    </div>
  );
}
