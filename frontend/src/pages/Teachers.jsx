import { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(
          Array.isArray(data.teachers)
            ? data.teachers
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addTeacher = () => {
    fetch("http://127.0.0.1:8000/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        experience: Number(experience),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Teacher Added Successfully");

        setTeachers([
          ...teachers,
          [
            Number(id),
            name,
            email,
            phone,
            subject,
            Number(experience),
          ],
        ]);

        setId("");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setExperience("");
      })
      .catch((err) => console.log(err));
  };

  const deleteTeacher = (id) => {
    fetch(`http://127.0.0.1:8000/teachers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Teacher Deleted Successfully");

        setTeachers(
          teachers.filter((t) => t[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Teachers</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Teachers</h2>
          <p>{teachers.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Teacher</h2>

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
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="number"
            placeholder="Experience"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
          />

          <button onClick={addTeacher}>
            Save Teacher
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t[0]}>
                <td>{t[0]}</td>
                <td>{t[1]}</td>
                <td>{t[2]}</td>
                <td>{t[3]}</td>
                <td>{t[4]}</td>
                <td>{t[5]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteTeacher(t[0])
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

export default Teachers;