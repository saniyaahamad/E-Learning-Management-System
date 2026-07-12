import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import courseData from "../pages/courseData";

function Home() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const addCart = (course) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(course);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Course Added To Cart");
  };

  const buyCourse = (course) => {
    localStorage.setItem(
      "buyCourse",
      JSON.stringify(course)
    );

    navigate("/payment");
  };

  return (
    <div>

      {/* Header */}

      <div
        style={{
          background: "#1c1d1f",
          color: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>E-Learning</h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "400px",
              padding: "12px",
              borderRadius: "5px",
              border: "none"
            }}
          />
        </div>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "30px"
          }}
        >
          🛒
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "white"
          }}
        >
          Dashboard
        </Link>
      </div>

      {/* Banner */}

      <div
        style={{
          padding: "50px",
          textAlign: "center"
        }}
      >
        <h1>
          Learn Anything, Anytime
        </h1>

        <p>
          Explore thousands of courses from expert instructors
        </p>
      </div>

      {/* Courses */}

      <h1
        style={{
          margin: "30px",
          textAlign: "center"
        }}
      >
        Recommended Courses
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "30px",
          padding: "30px"
        }}
      >
        {courseData
          .filter((course) =>
            course.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((course) => (
            <div
              key={course.id}
              className="course-card"
            >
              <Link
                to={`/course/${course.id}`}
                state={{ course }}
                style={{
                  textDecoration: "none",
                  color: "black"
                }}
              >
                <img
                  src={course.image}
                  alt=""
                />

                <div
                  className="course-info"
                >
                  <h2>
                    {course.name}
                  </h2>

                  <p>
                    {course.description}
                  </p>

                  <h4>
                    Duration :
                    {course.duration}
                  </h4>

                  <h4>
                    ⭐ {course.rating}
                  </h4>

                  <h3>
                    Price :
                    {course.price}
                  </h3>
                </div>
              </Link>

              <div
                className="button-box"
              >
                <button
                  className="cart-btn"
                  onClick={() =>
                    addCart(course)
                  }
                >
                  Add To Cart
                </button>

                <button
                  className="buy-btn"
                  onClick={() =>
                    buyCourse(course)
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;