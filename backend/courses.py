from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


# GET ALL COURSES
@router.get("/")
def get_courses():
    cur = connection.cursor()
    cur.execute("SELECT * FROM course")
    rows = cur.fetchall()
    cur.close()

    return {"courses": rows}


# GET ONE COURSE
@router.get("/{id}")
def get_course(id: int):
    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM course WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"course": row}


# POST
@router.post("/")
def add_course(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO course
        (id,course_name,duration,fees)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["course_name"],
            data["duration"],
            data["fees"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Course Added Successfully"}


# PUT
@router.put("/{id}")
def update_course(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE course
        SET course_name=%s,
            duration=%s,
            fees=%s
        WHERE id=%s
        """,
        (
            data["course_name"],
            data["duration"],
            data["fees"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Course Updated Successfully"}


# PATCH
@router.patch("/{course_name}")
def patch_course(course_name: str, data: dict):

    cur = connection.cursor()

    if "duration" in data:
        cur.execute(
            "UPDATE course SET duration=%s WHERE course_name=%s",
            (data["duration"], course_name)
        )

    if "fees" in data:
        cur.execute(
            "UPDATE course SET fees=%s WHERE course_name=%s",
            (data["fees"], course_name)
        )

    connection.commit()
    cur.close()

    return {"message": "Course Updated Successfully"}


# DELETE
@router.delete("/{id}")
def delete_subject(id: int):
    cur = connection.cursor()

    sql = "DELETE FROM subject WHERE id=%s"
    val = (id,)

    cur.execute(sql, val)
    connection.commit()

    print("Deleted rows:", cur.rowcount)

    cur.close()

    return {"message": "Subject Deleted Successfully"}