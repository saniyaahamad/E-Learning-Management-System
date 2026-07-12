import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import logo from "../images/logo.png";
import background from "../images/background.png";

import student from "../images/student.png";
import teacher from "../images/teacher.png";
import course from "../images/course.png";
import subject from "../images/subject.png";
import enrollment from "../images/enrollment.png";
import assignment from "../images/assignment.png";
import quiz from "../images/quiz.png";
import mark from "../images/mark.png";
import attendance from "../images/attendance.png";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    students: "",
    teachers: "",
    courses: "",
    subjects: "",
    enrollments: "",
    assignments: "",
    quizzes: "",
    marks: "",
    attendance: "",
  });
const [courses, setCourses] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:8000/courses")
    .then((res) => res.json())
    .then((data) => {
      setCourses(
        Array.isArray(data.courses)
          ? data.courses
          : []
      );
    });
}, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      {/* Logout Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Logo and Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "180px",
            height: "180px",
            background: "white",
            borderRadius: "50%",
            padding: "20px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: "60px",
            textShadow: "3px 3px 10px black",
            margin: "10px 0",
          }}
        >
          E-Learning Management System
        </h1>

        <h2
          style={{
            color: "white",
            fontSize: "45px",
            textShadow: "3px 3px 10px black",
            marginTop: "10px",
          }}
        >
          Dashboard
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        <Link
  to="/home"
  style={{
    position: "fixed",
    top: "20px",
    left: "20px",
    background: "#4f46e5",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0px 2px 10px gray",
  }}
>
  Home
</Link>
        <Link to="/students" style={cardStyle}>
          <img src={student} alt="" style={imgStyle} />
          <h3>Students</h3>
          <p>{data.students}</p>
        </Link>

        <Link to="/teachers" style={cardStyle}>
          <img src={teacher} alt="" style={imgStyle} />
          <h3>Teachers</h3>
          <p>{data.teachers}</p>
        </Link>

        <Link to="/courses" style={cardStyle}>
          <img src={course} alt="" style={imgStyle} />
          <h3>Courses</h3>
          <p>{data.courses}</p>
        </Link>

        <Link to="/subjects" style={cardStyle}>
          <img src={subject} alt="" style={imgStyle} />
          <h3>Subjects</h3>
          <p>{data.subjects}</p>
        </Link>

        <Link to="/enrollments" style={cardStyle}>
          <img src={enrollment} alt="" style={imgStyle} />
          <h3>Enrollments</h3>
          <p>{data.enrollments}</p>
        </Link>

        <Link to="/assignments" style={cardStyle}>
          <img src={assignment} alt="" style={imgStyle} />
          <h3>Assignments</h3>
          <p>{data.assignments}</p>
        </Link>

        <Link to="/quizzes" style={cardStyle}>
          <img src={quiz} alt="" style={imgStyle} />
          <h3>Quizzes</h3>
          <p>{data.quizzes}</p>
        </Link>

        <Link to="/marks" style={cardStyle}>
          <img src={mark} alt="" style={imgStyle} />
          <h3>Marks</h3>
          <p>{data.marks}</p>
        </Link>

        <Link to="/attendance" style={cardStyle}>
          <img src={attendance} alt="" style={imgStyle} />
          <h3>Attendance</h3>
          <p>{data.attendance}</p>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  textDecoration: "none",
  color: "black",
  borderRadius: "15px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0px 2px 10px gray",
};

const imgStyle = {
  width: "80px",
  height: "80px",
};

export default Dashboard;