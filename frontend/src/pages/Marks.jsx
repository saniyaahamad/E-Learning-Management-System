import { useEffect, useState } from "react";

function Marks() {
  const [marks, setMarks] = useState([]);

  const [id, setId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [marksObtained, setMarksObtained] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/marks")
      .then((res) => res.json())
      .then((data) => {
        setMarks(
          Array.isArray(data.marks)
            ? data.marks
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addMarks = () => {
    fetch("http://127.0.0.1:8000/marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        student_id: Number(studentId),
        quiz_id: Number(quizId),
        marks_obtained: Number(marksObtained),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Marks Added Successfully");

        setMarks([
          ...marks,
          [
            Number(id),
            Number(studentId),
            Number(quizId),
            Number(marksObtained),
          ],
        ]);

        setId("");
        setStudentId("");
        setQuizId("");
        setMarksObtained("");
      })
      .catch((err) => console.log(err));
  };

  const deleteMarks = (id) => {
    fetch(`http://127.0.0.1:8000/marks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Marks Deleted Successfully");

        setMarks(
          marks.filter((m) => m[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Marks</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Marks Records</h2>
          <p>{marks.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Marks</h2>

          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="number"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Quiz ID"
            value={quizId}
            onChange={(e) =>
              setQuizId(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Marks Obtained"
            value={marksObtained}
            onChange={(e) =>
              setMarksObtained(e.target.value)
            }
          />

          <button onClick={addMarks}>
            Save Marks
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Quiz ID</th>
              <th>Marks Obtained</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((m) => (
              <tr key={m[0]}>
                <td>{m[0]}</td>
                <td>{m[1]}</td>
                <td>{m[2]}</td>
                <td>{m[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteMarks(m[0])
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

export default Marks;