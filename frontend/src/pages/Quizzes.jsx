import { useEffect, useState } from "react";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [quizDate, setQuizDate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/quizzes")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(
          Array.isArray(data.quizzes)
            ? data.quizzes
            : []
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const addQuiz = () => {
    fetch("http://127.0.0.1:8000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        title: title,
        total_marks: Number(totalMarks),
        quiz_date: quizDate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Quiz Added Successfully");

        setQuizzes([
          ...quizzes,
          [
            Number(id),
            title,
            Number(totalMarks),
            quizDate,
          ],
        ]);

        setId("");
        setTitle("");
        setTotalMarks("");
        setQuizDate("");
      })
      .catch((err) => console.log(err));
  };

  const deleteQuiz = (id) => {
    fetch(`http://127.0.0.1:8000/quizzes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Quiz Deleted Successfully");

        setQuizzes(
          quizzes.filter((q) => q[0] !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <h1 className="title">Quizzes</h1>

      <div className="top-section">
        <div className="total-card">
          <h2>Total Quizzes</h2>
          <p>{quizzes.length}</p>
        </div>

        <div className="form-card">
          <h2>Add Quiz</h2>

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
            type="number"
            placeholder="Total Marks"
            value={totalMarks}
            onChange={(e) =>
              setTotalMarks(e.target.value)
            }
          />

          <input
            type="date"
            value={quizDate}
            onChange={(e) =>
              setQuizDate(e.target.value)
            }
          />

          <button onClick={addQuiz}>
            Save Quiz
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Total Marks</th>
              <th>Quiz Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((q) => (
              <tr key={q[0]}>
                <td>{q[0]}</td>
                <td>{q[1]}</td>
                <td>{q[2]}</td>
                <td>{q[3]}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteQuiz(q[0])
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

export default Quizzes;