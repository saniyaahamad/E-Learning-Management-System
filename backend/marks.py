from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/marks",
    tags=["Marks"]
)


# GET ALL MARKS
@router.get("/")
def get_marks():
    cur = connection.cursor()
    cur.execute("SELECT * FROM marks")
    rows = cur.fetchall()
    cur.close()

    return {"marks": rows}


# GET ONE MARK
@router.get("/{id}")
def get_mark(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM marks WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"mark": row}


# POST
@router.post("/")
def add_mark(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO marks
        (id,student_id,quiz_id,marks_obtained)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["student_id"],
            data["quiz_id"],
            data["marks_obtained"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Marks Added Successfully"}


# PUT
@router.put("/{id}")
def update_mark(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE marks
        SET student_id=%s,
            quiz_id=%s,
            marks_obtained=%s
        WHERE id=%s
        """,
        (
            data["student_id"],
            data["quiz_id"],
            data["marks_obtained"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Marks Updated Successfully"}


# PATCH
@router.patch("/{id}")
def patch_mark(id: int, data: dict):

    cur = connection.cursor()

    if "student_id" in data:
        cur.execute(
            "UPDATE marks SET student_id=%s WHERE id=%s",
            (data["student_id"], id)
        )

    if "quiz_id" in data:
        cur.execute(
            "UPDATE marks SET quiz_id=%s WHERE id=%s",
            (data["quiz_id"], id)
        )

    if "marks_obtained" in data:
        cur.execute(
            "UPDATE marks SET marks_obtained=%s WHERE id=%s",
            (data["marks_obtained"], id)
        )

    connection.commit()
    cur.close()

    return {"message": "Marks Updated Successfully"}


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