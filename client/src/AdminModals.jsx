import React from "react";

export function AppDetailsModal({ app, onClose, onUpdateStatus }) {
  if (!app) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 9999, padding: "20px", boxSizing: "border-box"
    }}>
      <div style={{
        background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "520px",
        padding: "30px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#1f1d2b" }}>Application Details</h2>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
          <div><strong>Applicant:</strong> {app.name} ({app.email})</div>
          <div><strong>USN:</strong> {app.usn}</div>
          <div><strong>Department & Year:</strong> {app.department} • {app.year}</div>
          <div><strong>Club & Team:</strong> {app.clubName} — {app.teamName}</div>
          <div><strong>Status:</strong> {app.status}</div>
          <div><strong>Applied On:</strong> {new Date(app.appliedOn || app.createdAt).toLocaleString()}</div>
          <div>
            <strong>Reason for Joining:</strong>
            <div style={{ background: "#f8f8fc", padding: "12px", borderRadius: "8px", marginTop: "6px", lineHeight: "1.6" }}>
              {app.reason}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <button type="button" onClick={onClose} style={{ padding: "9px 18px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>Close</button>
          {app.status === "Pending" && (
            <>
              <button type="button" onClick={() => { onUpdateStatus(app._id || app.id, "Accepted"); onClose(); }} style={{ padding: "9px 18px", border: "none", borderRadius: "6px", background: "#27ae60", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Accept</button>
              <button type="button" onClick={() => { onUpdateStatus(app._id || app.id, "Rejected"); onClose(); }} style={{ padding: "9px 18px", border: "none", borderRadius: "6px", background: "#e74c3c", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddEventModal({ isOpen, onClose, form, setForm, onSubmit }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 9999, padding: "20px", boxSizing: "border-box"
    }}>
      <div style={{ background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "520px", padding: "30px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>Add New Event</h2>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" required placeholder="Event Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <select value={form.club} onChange={(e) => setForm({ ...form, club: e.target.value })} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
              <option value="Drama Club">Drama Club</option>
              <option value="Dance Club">Dance Club</option>
              <option value="Music Club">Music Club</option>
              <option value="Coding Club">Coding Club</option>
              <option value="General">College Wide</option>
            </select>
            <input type="text" required placeholder="Category (e.g. Workshop)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" required placeholder="Date (e.g. 20 Nov 2026)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
            <input type="text" required placeholder="Time (e.g. 10:00 AM)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          </div>
          <input type="text" required placeholder="Venue (e.g. Seminar Hall)" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          <textarea required rows="3" placeholder="Event Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={onClose} style={{ padding: "10px 18px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>Cancel</button>
            <button type="submit" style={{ padding: "10px 20px", border: "none", borderRadius: "6px", background: "#7953ed", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddAnnouncementModal({ isOpen, onClose, form, setForm, onSubmit }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 9999, padding: "20px", boxSizing: "border-box"
    }}>
      <div style={{ background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "480px", padding: "30px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>Post Announcement</h2>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" required placeholder="Announcement Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
            <option value="Important">Important</option>
            <option value="Recruitment">Recruitment</option>
            <option value="Event">Event</option>
            <option value="General">General</option>
          </select>
          <textarea required rows="4" placeholder="Announcement Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={onClose} style={{ padding: "10px 18px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>Cancel</button>
            <button type="submit" style={{ padding: "10px 20px", border: "none", borderRadius: "6px", background: "#7953ed", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Post Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
}
