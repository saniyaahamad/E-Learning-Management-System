from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"]
)


# GET ALL TEACHERS
@router.get("/")
def get_teachers():
    cur = connection.cursor()
    cur.execute("SELECT * FROM teacher")
    rows = cur.fetchall()
    cur.close()

    return {"teachers": rows}


# GET ONE TEACHER
@router.get("/{id}")
def get_teacher(id: int):
    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM teacher WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"teacher": row}


# POST
@router.post("/")
def add_teacher(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO teacher
        (id,name,email,phone,subject,experience)
        VALUES (%s,%s,%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["name"],
            data["email"],
            data["phone"],
            data["subject"],
            data["experience"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Teacher Added Successfully"}


# PUT
@router.put("/{id}")
def update_teacher(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE teacher
        SET name=%s,
            email=%s,
            phone=%s,
            subject=%s,
            experience=%s
        WHERE id=%s
        """,
        (
            data["name"],
            data["email"],
            data["phone"],
            data["subject"],
            data["experience"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Teacher Updated Successfully"}


# PATCH
@router.patch("/{name}")
def patch_teacher(name: str, data: dict):

    cur = connection.cursor()

    if "email" in data:
        cur.execute(
            "UPDATE teacher SET email=%s WHERE name=%s",
            (data["email"], name)
        )

    if "phone" in data:
        cur.execute(
            "UPDATE teacher SET phone=%s WHERE name=%s",
            (data["phone"], name)
        )

    if "subject" in data:
        cur.execute(
            "UPDATE teacher SET subject=%s WHERE name=%s",
            (data["subject"], name)
        )

    if "experience" in data:
        cur.execute(
            "UPDATE teacher SET experience=%s WHERE name=%s",
            (data["experience"], name)
        )

    connection.commit()
    cur.close()

    return {"message": "Teacher Updated Successfully"}


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