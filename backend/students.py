from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


# GET ALL STUDENTS
@router.get("/")
def get_students():
    cur = connection.cursor()
    cur.execute("SELECT * FROM student")
    rows = cur.fetchall()
    cur.close()

    return {"students": rows}


# GET ONE STUDENT
@router.get("/{id}")
def get_student(id: int):
    cur = connection.cursor()
    cur.execute(
        "SELECT * FROM student WHERE id=%s",
        (id,)
    )
    row = cur.fetchone()
    cur.close()

    return {"student": row}


# POST
@router.post("/")
def add_student(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO student
        (id,name,age,email,phone,course)
        VALUES (%s,%s,%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["name"],
            data["age"],
            data["email"],
            data["phone"],
            data["course"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Student Added Successfully"}


# PUT
@router.put("/{id}")
def update_student(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE student
        SET name=%s,
            age=%s,
            email=%s,
            phone=%s,
            course=%s
        WHERE id=%s
        """,
        (
            data["name"],
            data["age"],
            data["email"],
            data["phone"],
            data["course"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Student Updated Successfully"}


# PATCH
@router.patch("/{name}")
def patch_student(name: str, data: dict):

    cur = connection.cursor()

    if "age" in data:
        cur.execute(
            "UPDATE student SET age=%s WHERE name=%s",
            (data["age"], name)
        )

    if "email" in data:
        cur.execute(
            "UPDATE student SET email=%s WHERE name=%s",
            (data["email"], name)
        )

    if "phone" in data:
        cur.execute(
            "UPDATE student SET phone=%s WHERE name=%s",
            (data["phone"], name)
        )

    if "course" in data:
        cur.execute(
            "UPDATE student SET course=%s WHERE name=%s",
            (data["course"], name)
        )

    connection.commit()
    cur.close()

    return {"message": "Student Updated Successfully"}


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