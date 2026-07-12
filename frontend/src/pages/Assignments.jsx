import { useEffect, useState } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = () => {
    fetch("http://127.0.0.1:8000/assignments")
      .then((res) => res.json())
      .then((data) => {
        setAssignments(
          Array.isArray(data.assignments)
            ? data.assignments
            : []
        );
      })
      .catch((err) => console.log(err));
  };

  const addAssignment = () => {
    fetch("http://127.0.0.1:8000/assignments", {
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
        alert("Assignment Added Successfully");

        setId("");
        setTitle("");
        setDescription("");
        setDueDate("");

        loadAssignments();
      })
      .catch((err) => console.log(err));
  };

  const deleteAssignment = (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    fetch(`http://127.0.0.1:8000/assignments/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Assignment Deleted Successfully");
        loadAssignments();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Assignments</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Assignments</h2>
          <p>{assignments.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Assignment</h2>

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

          <button onClick={addAssignment}>
            Save Assignment
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
            {assignments.map((a) => (
              <tr key={a[0]}>
                <td>{a[0]}</td>
                <td>{a[1]}</td>
                <td>{a[2]}</td>
                <td>{a[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteAssignment(a[0])
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

export default Assignments;