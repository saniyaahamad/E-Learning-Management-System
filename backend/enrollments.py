from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"]
)


# GET ALL ENROLLMENTS
@router.get("/")
def get_enrollments():
    cur = connection.cursor()
    cur.execute("SELECT * FROM enrollment")
    rows = cur.fetchall()
    cur.close()

    return {"enrollments": rows}


# GET ONE ENROLLMENT
@router.get("/{id}")
def get_enrollment(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM enrollment WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"enrollment": row}


# POST
@router.post("/")
def add_enrollment(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO enrollment
        (id,student_id,course_id,enrollment_date)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["student_id"],
            data["course_id"],
            data["enrollment_date"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Enrollment Added Successfully"}


# PUT
@router.put("/{id}")
def update_enrollment(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE enrollment
        SET student_id=%s,
            course_id=%s,
            enrollment_date=%s
        WHERE id=%s
        """,
        (
            data["student_id"],
            data["course_id"],
            data["enrollment_date"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Enrollment Updated Successfully"}


# PATCH
@router.patch("/{id}")
def patch_enrollment(id: int, data: dict):

    cur = connection.cursor()

    if "student_id" in data:
        cur.execute(
            "UPDATE enrollment SET student_id=%s WHERE id=%s",
            (data["student_id"], id)
        )

    if "course_id" in data:
        cur.execute(
            "UPDATE enrollment SET course_id=%s WHERE id=%s",
            (data["course_id"], id)
        )

    if "enrollment_date" in data:
        cur.execute(
            "UPDATE enrollment SET enrollment_date=%s WHERE id=%s",
            (data["enrollment_date"], id)
        )

    connection.commit()
    cur.close()

    return {"message": "Enrollment Updated Successfully"}


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