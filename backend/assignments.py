from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)


# GET ALL ASSIGNMENTS
@router.get("/")
def get_assignments():
    cur = connection.cursor()
    cur.execute("SELECT * FROM assignment")
    rows = cur.fetchall()
    cur.close()

    return {"assignments": rows}


# GET ONE ASSIGNMENT
@router.get("/{id}")
def get_assignment(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM assignment WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"assignment": row}


# POST
@router.post("/")
def add_assignment(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO assignment
        (id,title,subject_id,due_date)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["title"],
            data["subject_id"],
            data["due_date"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Assignment Added Successfully"}


# PUT
@router.put("/{id}")
def update_assignment(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE assignment
        SET title=%s,
            subject_id=%s,
            due_date=%s
        WHERE id=%s
        """,
        (
            data["title"],
            data["subject_id"],
            data["due_date"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Assignment Updated Successfully"}


# PATCH
@router.patch("/{title}")
def patch_assignment(title: str, data: dict):

    cur = connection.cursor()

    if "subject_id" in data:
        cur.execute(
            "UPDATE assignment SET subject_id=%s WHERE title=%s",
            (data["subject_id"], title)
        )

    if "due_date" in data:
        cur.execute(
            "UPDATE assignment SET due_date=%s WHERE title=%s",
            (data["due_date"], title)
        )

    connection.commit()
    cur.close()

    return {"message": "Assignment Updated Successfully"}


# DELETE
@router.delete("/{title}")
def delete_assignment(title: str):

    cur = connection.cursor()

    cur.execute(
        "DELETE FROM assignment WHERE title=%s",
        (title,)
    )

    connection.commit()
    cur.close()

    return {"message": "Assignment Deleted Successfully"}