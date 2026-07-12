from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)


# GET ALL QUIZZES
@router.get("/")
def get_quizzes():
    cur = connection.cursor()
    cur.execute("SELECT * FROM quiz")
    rows = cur.fetchall()
    cur.close()

    return {"quizzes": rows}


# GET ONE QUIZ
@router.get("/{id}")
def get_quiz(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM quiz WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"quiz": row}


# POST
@router.post("/")
def add_quiz(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO quiz
        (id,title,subject_id,total_marks)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["title"],
            data["subject_id"],
            data["total_marks"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Quiz Added Successfully"}


# PUT
@router.put("/{id}")
def update_quiz(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE quiz
        SET title=%s,
            subject_id=%s,
            total_marks=%s
        WHERE id=%s
        """,
        (
            data["title"],
            data["subject_id"],
            data["total_marks"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Quiz Updated Successfully"}


# PATCH
@router.patch("/{title}")
def patch_quiz(title: str, data: dict):

    cur = connection.cursor()

    if "subject_id" in data:
        cur.execute(
            "UPDATE quiz SET subject_id=%s WHERE title=%s",
            (data["subject_id"], title)
        )

    if "total_marks" in data:
        cur.execute(
            "UPDATE quiz SET total_marks=%s WHERE title=%s",
            (data["total_marks"], title)
        )

    connection.commit()
    cur.close()

    return {"message": "Quiz Updated Successfully"}


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