import { useEffect, useState } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = () => {
    fetch("http://127.0.0.1:8000/attendance")
      .then((res) => res.json())
      .then((data) => {
        setAttendance(
          Array.isArray(data.attendance)
            ? data.attendance
            : []
        );
      })
      .catch((err) => console.log(err));
  };

  const addAttendance = () => {
    fetch("http://127.0.0.1:8000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        title: title,
        description: description,
        due_date: dueDate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Attendance Added Successfully");

        setId("");
        setTitle("");
        setDescription("");
        setDueDate("");

        loadAttendance();
      })
      .catch((err) => console.log(err));
  };

  const deleteAttendance = (id) => {
    if (!window.confirm("Delete this attendance?")) return;

    fetch(`http://127.0.0.1:8000/attendance/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Attendance Deleted Successfully");
        loadAttendance();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Attendance</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Attendance</h2>
          <p>{attendance.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Attendance</h2>

          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <button onClick={addAttendance}>
            Save Attendance
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a) => (
              <tr key={a[0]}>
                <td>{a[0]}</td>
                <td>{a[1]}</td>
                <td>{a[2]}</td>
                <td>{a[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteAttendance(a[0])
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;