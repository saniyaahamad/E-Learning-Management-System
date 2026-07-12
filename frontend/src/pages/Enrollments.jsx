import { useEffect, useState } from "react";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  const [id, setId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/enrollments")
      .then((res) => res.json())
      .then((data) => {
        setEnrollments(
          Array.isArray(data.enrollments)
            ? data.enrollments
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addEnrollment = () => {
    fetch("http://127.0.0.1:8000/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        student_id: Number(studentId),
        course_id: Number(courseId),
        enrollment_date: enrollmentDate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Enrollment Added Successfully");

        setEnrollments([
          ...enrollments,
          [
            Number(id),
            Number(studentId),
            Number(courseId),
            enrollmentDate,
          ],
        ]);

        setId("");
        setStudentId("");
        setCourseId("");
        setEnrollmentDate("");
      })
      .catch((err) => console.log(err));
  };

  const deleteEnrollment = (id) => {
    fetch(`http://127.0.0.1:8000/enrollments/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Enrollment Deleted Successfully");

        setEnrollments(
          enrollments.filter((e) => e[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Enrollments</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Enrollments</h2>
          <p>{enrollments.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Enrollment</h2>

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
            onChange={(e) => setStudentId(e.target.value)}
          />

          <input
            type="number"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />

          <input
            type="date"
            value={enrollmentDate}
            onChange={(e) =>
              setEnrollmentDate(e.target.value)
            }
          />

          <button onClick={addEnrollment}>
            Save Enrollment
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Enrollment Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((e) => (
              <tr key={e[0]}>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>{e[2]}</td>
                <td>{e[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteEnrollment(e[0])
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

export default Enrollments;