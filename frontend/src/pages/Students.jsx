import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(
          Array.isArray(data.students)
            ? data.students
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addStudent = () => {
    fetch("http://127.0.0.1:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        name: name,
        age: Number(age),
        email: email,
        phone: phone,
        course: course,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Student Added Successfully");

        setStudents([
          ...students,
          [
            Number(id),
            name,
            Number(age),
            email,
            phone,
            course,
          ],
        ]);

        setId("");
        setName("");
        setAge("");
        setEmail("");
        setPhone("");
        setCourse("");
      })
      .catch((err) => console.log(err));
  };

  const deleteStudent = (id) => {
    fetch(`http://127.0.0.1:8000/students/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Student Deleted Successfully");

        setStudents(
          students.filter((s) => s[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Students</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Students</h2>
          <p>{students.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Student</h2>

          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <button onClick={addStudent}>
            Save Student
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s[0]}>
                <td>{s[0]}</td>
                <td>{s[1]}</td>
                <td>{s[2]}</td>
                <td>{s[3]}</td>
                <td>{s[4]}</td>
                <td>{s[5]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteStudent(s[0])
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
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

export default Students;