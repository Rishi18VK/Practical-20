import { useEffect, useState } from "react";
function EmployeeForm({ onSave, editing, onCancel }) {
  const blank = { name: "", email: "", dept: "" };
  const [f, setF] = useState(blank);
  useEffect(() => { setF(editing || blank); }, [editing]);
  const submit = (e) => { e.preventDefault(); onSave(f); setF(blank); };
  return (
    <form className="card" onSubmit={submit}>
      <h2>{editing ? "Update Employee" : "Add Employee"}</h2>
      <input placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
      <input type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required />
      <input placeholder="Department" value={f.dept} onChange={(e) => setF({ ...f, dept: e.target.value })} required />
      <button type="submit">{editing ? "Update" : "Add"}</button>
      {editing && <button type="button" className="alt" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) return <div className="card"><p>No employees found.</p></div>;
  return (
    <div className="card">
      <h2>Employees ({employees.length})</h2>
      <ul>
        {employees.map((e) => (
          <li key={e.id}>
            <span><b>{e.name}</b><br />{e.email} | {e.dept}</span>
            <span>
              <button onClick={() => onEdit(e)}>Edit</button>{" "}
              <button className="del" onClick={() => onDelete(e.id)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then((r) => r.json())
      .then((d) => {
        setEmployees(d.map((u) => ({ id: u.id, name: u.name, email: u.email, dept: u.company.name })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const save = (emp) => {
    if (editing) {
      setEmployees(employees.map((e) => (e.id === editing.id ? { ...emp, id: editing.id } : e)));
      setEditing(null);
    } else {
      setEmployees([...employees, { ...emp, id: Date.now() }]);
    }
  };
  const remove = (id) => setEmployees(employees.filter((e) => e.id !== id));
  return (
    <div className="app">
      <h1>Employee Management</h1>
      <EmployeeForm onSave={save} editing={editing} onCancel={() => setEditing(null)} />
      {loading ? <p>Loading from API...</p> : <EmployeeList employees={employees} onEdit={setEditing} onDelete={remove} />}
    </div>
  );
}
