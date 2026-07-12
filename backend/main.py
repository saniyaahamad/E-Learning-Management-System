from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from purchase import router as purchase_router
from students import router as student_router
from teachers import router as teacher_router
from courses import router as course_router
from subjects import router as subject_router
from enrollments import router as enrollment_router
from assignments import router as assignment_router
from quizzes import router as quiz_router
from marks import router as marks_router
from attendance import router as attendance_router
from login import router as login_router

app = FastAPI()
from database import connection


@app.get("/")
def home():
    return {"message": "E-Learning API Running"}


# Add to Cart API
@app.post("/cart")
def add_to_cart(data: dict):
    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO cart (student_id, course_id)
        VALUES (%s, %s)
        """,
        (
            data["student_id"],
            data["course_id"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Course added to cart"}

@app.get("/cart/{student_id}")
def get_cart(student_id: int):
    cur = connection.cursor()

    cur.execute(
        """
        SELECT * FROM cart
        WHERE student_id=%s
        """,
        (student_id,)
    )

    data = cur.fetchall()
    cur.close()

    return {"cart": data}

@app.delete("/cart/{id}")
def delete_cart(id: int):
    cur = connection.cursor()

    cur.execute(
        "DELETE FROM cart WHERE id=%s",
        (id,)
    )

    connection.commit()
    cur.close()

    return {"message": "Course removed from cart"}

@app.post("/purchase")
def purchase_course(data: dict):
    cur = connection.cursor()

    student_id = data["student_id"]
    course_id = data["course_id"]

    # Add enrollment
    cur.execute(
        """
        INSERT INTO enrollment
        (student_id, course_id, enrollment_date)
        VALUES (%s, %s, CURDATE())
        """,
        (student_id, course_id)
    )

    # Update student's course
    cur.execute(
        """
        UPDATE student
        SET course=%s
        WHERE id=%s
        """,
        (course_id, student_id)
    )

    # Create attendance record
    cur.execute(
        """
        INSERT INTO attendance
        (student_id, attendance_date, status)
        VALUES (%s, CURDATE(), 'Present')
        """,
        (student_id,)
    )

    connection.commit()
    cur.close()

    return {"message": "Course purchased successfully"}

@app.get("/course-details/{course_id}")
def course_details(course_id:int):

    cur = connection.cursor()


    # Course
    cur.execute(
        "SELECT * FROM course WHERE id=%s",
        (course_id,)
    )

    course = cur.fetchone()



    # Subjects
    cur.execute(
        "SELECT * FROM subject WHERE course_id=%s",
        (course_id,)
    )

    subjects = cur.fetchall()



    # Assignments
    cur.execute(
        """
        SELECT * FROM assignment
        WHERE course_id=%s
        """,
        (course_id,)
    )

    assignments = cur.fetchall()



    # Quiz
    cur.execute(
        """
        SELECT * FROM quiz
        WHERE course_id=%s
        """,
        (course_id,)
    )

    quizzes = cur.fetchall()



    # Marks
    cur.execute(
        """
        SELECT * FROM marks
        WHERE course_id=%s
        """,
        (course_id,)
    )

    marks = cur.fetchall()



    # Attendance
    cur.execute(
        """
        SELECT * FROM attendance
        WHERE course_id=%s
        """,
        (course_id,)
    )

    attendance = cur.fetchall()



    cur.close()


    return {

        "course":course,

        "subjects":subjects,

        "assignments":assignments,

        "quizzes":quizzes,

        "marks":marks,

        "attendance":attendance

    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(purchase_router)
app.include_router(student_router)
app.include_router(teacher_router)
app.include_router(course_router)
app.include_router(subject_router)
app.include_router(enrollment_router)
app.include_router(assignment_router)
app.include_router(quiz_router)
app.include_router(marks_router)
app.include_router(attendance_router)
app.include_router(login_router)


@app.get("/")
def home():
    return {"message": "E-Learning Management System API Running"}