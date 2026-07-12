import { useLocation, Link } from "react-router-dom";
import "./courseDetails.css";

function CourseDetails() {
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="not-found">
        <h2>Course Not Found</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="course-details">

      <div className="course-top">

        <img
          src={course.image}
          alt={course.name}
          className="course-image"
        />

        <div className="course-info">

          <h1>{course.name}</h1>

          <p className="desc">
            {course.description}
          </p>

          <h3>💰 Price : {course.price}</h3>

          <h3>⭐ Rating : {course.rating}</h3>

          <h3>👨‍🏫 Instructor : {course.instructor}</h3>

          <h3>⏳ Duration : {course.duration}</h3>

        </div>
      </div>

      <div className="section">
        <h2>📘 What You'll Learn</h2>

        <ul>
          {course.learn.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>📚 Course Chapters</h2>

        <ol>
          {course.chapters.map((chapter, index) => (
            <li key={index}>{chapter}</li>
          ))}
        </ol>
      </div>

      <div className="section">
        <h2>📝 Assignments</h2>

        <ul>
          {course.assignments.map((assignment, index) => (
            <li key={index}>{assignment}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>❓ Quizzes</h2>

        <ul>
          {course.quizzes.map((quiz, index) => (
            <li key={index}>{quiz}</li>
          ))}
        </ul>
      </div>

      <div className="button-box">

        <button className="buy-btn">
          Buy Now
        </button>

        <Link to="/">
          <button className="back-btn">
            Back to Courses
          </button>
        </Link>

      </div>

    </div>
  );
}

export default CourseDetails;