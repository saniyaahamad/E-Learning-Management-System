from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


# GET ALL SUBJECTS
@router.get("/")
def get_subjects():
    cur = connection.cursor()
    cur.execute("SELECT * FROM subject")
    rows = cur.fetchall()
    cur.close()

    return {"subjects": rows}


# GET ONE SUBJECT
@router.get("/{id}")
def get_subject(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM subject WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"subject": row}


# POST
@router.post("/")
def add_subject(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO subject
        (id,subject_name,course_id,teacher_id)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["subject_name"],
            data["course_id"],
            data["teacher_id"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Subject Added Successfully"}


# PUT
@router.put("/{id}")
def update_subject(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE subject
        SET subject_name=%s,
            course_id=%s,
            teacher_id=%s
        WHERE id=%s
        """,
        (
            data["subject_name"],
            data["course_id"],
            data["teacher_id"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Subject Updated Successfully"}


# PATCH
@router.patch("/{subject_name}")
def patch_subject(subject_name: str, data: dict):

    cur = connection.cursor()

    if "course_id" in data:
        cur.execute(
            "UPDATE subject SET course_id=%s WHERE subject_name=%s",
            (data["course_id"], subject_name)
        )

    if "teacher_id" in data:
        cur.execute(
            "UPDATE subject SET teacher_id=%s WHERE subject_name=%s",
            (data["teacher_id"], subject_name)
        )

    connection.commit()
    cur.close()

    return {"message": "Subject Updated Successfully"}


# DELETE

@router.delete("/{id}")
def delete_subject(id: int):
    print("Deleting subject:", id)

    cur = connection.cursor()

    cur.execute(
        "DELETE FROM subject WHERE id=%s",
        (id,)
    )

    print("Rows deleted:", cur.rowcount)

    connection.commit()
    cur.close()

    return {"message": "Subject Deleted Successfully"}