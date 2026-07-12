import { useEffect, useState } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  const [id, setId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/subjects")
      .then((res) => res.json())
      .then((data) => {
        setSubjects(
          Array.isArray(data.subjects)
            ? data.subjects
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addSubject = () => {
    fetch("http://127.0.0.1:8000/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        subject_name: subjectName,
        course_name: courseName,
        credits: Number(credits),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Subject Added Successfully");

        setSubjects([
          ...subjects,
          [
            Number(id),
            subjectName,
            courseName,
            Number(credits),
          ],
        ]);

        setId("");
        setSubjectName("");
        setCourseName("");
        setCredits("");
      })
      .catch((err) => console.log(err));
  };

  const deleteSubject = (id) => {
    fetch(`http://127.0.0.1:8000/subjects/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Subject Deleted Successfully");

        setSubjects(
          subjects.filter((s) => s[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Subjects</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Subjects</h2>
          <p>{subjects.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Subject</h2>

          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) =>
              setSubjectName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) =>
              setCourseName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Credits"
            value={credits}
            onChange={(e) =>
              setCredits(e.target.value)
            }
          />

          <button onClick={addSubject}>
            Save Subject
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject Name</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((s) => (
              <tr key={s[0]}>
                <td>{s[0]}</td>
                <td>{s[1]}</td>
                <td>{s[2]}</td>
                <td>{s[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteSubject(s[0])
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

export default Subjects;