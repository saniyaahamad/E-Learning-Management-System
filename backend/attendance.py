from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


# GET ALL ATTENDANCE
@router.get("/")
def get_attendance():
    cur = connection.cursor()
    cur.execute("SELECT * FROM attendance")
    rows = cur.fetchall()
    cur.close()

    return {"attendance": rows}


# GET ONE ATTENDANCE
@router.get("/{id}")
def get_attendance_record(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM attendance WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()
    cur.close()

    return {"attendance": row}


# POST
@router.post("/")
def add_attendance(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO attendance
        (id,student_id,subject_id,attendance_date,status)
        VALUES (%s,%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["student_id"],
            data["subject_id"],
            data["attendance_date"],
            data["status"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Attendance Added Successfully"}


# PUT
@router.put("/{id}")
def update_attendance(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE attendance
        SET student_id=%s,
            subject_id=%s,
            attendance_date=%s,
            status=%s
        WHERE id=%s
        """,
        (
            data["student_id"],
            data["subject_id"],
            data["attendance_date"],
            data["status"],
            id
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Attendance Updated Successfully"}


# PATCH
@router.patch("/{id}")
def patch_attendance(id: int, data: dict):

    cur = connection.cursor()

    if "student_id" in data:
        cur.execute(
            "UPDATE attendance SET student_id=%s WHERE id=%s",
            (data["student_id"], id)
        )

    if "subject_id" in data:
        cur.execute(
            "UPDATE attendance SET subject_id=%s WHERE id=%s",
            (data["subject_id"], id)
        )

    if "attendance_date" in data:
        cur.execute(
            "UPDATE attendance SET attendance_date=%s WHERE id=%s",
            (data["attendance_date"], id)
        )

    if "status" in data:
        cur.execute(
            "UPDATE attendance SET status=%s WHERE id=%s",
            (data["status"], id)
        )

    connection.commit()
    cur.close()

    return {"message": "Attendance Updated Successfully"}


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