import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> |
      <Link to="/students">Students</Link> |
      <Link to="/teachers">Teachers</Link> |
      <Link to="/courses">Courses</Link> |
      <Link to="/subjects">Subjects</Link> |
      <Link to="/enrollments">Enrollments</Link> |
      <Link to="/assignments">Assignments</Link> |
      <Link to="/quizzes">Quizzes</Link> |
      <Link to="/marks">Marks</Link> |
      <Link to="/attendance">Attendance</Link>
    </nav>
  );
}

export default Navbar;