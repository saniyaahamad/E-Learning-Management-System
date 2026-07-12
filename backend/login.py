from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/login",
    tags=["Login"]
)


# GET ALL LOGIN USERS
@router.get("/")
def get_logins():

    cur = connection.cursor()

    cur.execute("SELECT * FROM login")
    rows = cur.fetchall()

    cur.close()

    return {"logins": rows}


# GET ONE LOGIN USER
@router.get("/{id}")
def get_login(id: int):

    cur = connection.cursor()

    cur.execute(
        "SELECT * FROM login WHERE id=%s",
        (id,)
    )

    row = cur.fetchone()

    cur.close()

    return {"login": row}


# POST
@router.post("/")
def add_login(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO login
        (id,username,password,role)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["id"],
            data["username"],
            data["password"],
            data["role"]
        )
    )

    connection.commit()

    cur.close()

    return {"message": "Login Added Successfully"}


# PUT
@router.put("/{id}")
def update_login(id: int, data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        UPDATE login
        SET username=%s,
            password=%s,
            role=%s
        WHERE id=%s
        """,
        (
            data["username"],
            data["password"],
            data["role"],
            id
        )
    )

    connection.commit()

    cur.close()

    return {"message": "Login Updated Successfully"}


# PATCH
@router.patch("/{username}")
def patch_login(username: str, data: dict):

    cur = connection.cursor()

    if "password" in data:
        cur.execute(
            "UPDATE login SET password=%s WHERE username=%s",
            (data["password"], username)
        )

    if "role" in data:
        cur.execute(
            "UPDATE login SET role=%s WHERE username=%s",
            (data["role"], username)
        )

    connection.commit()

    cur.close()

    return {"message": "Login Updated Successfully"}


# DELETE
@router.delete("/{username}")
def delete_login(username: str):

    cur = connection.cursor()

    cur.execute(
        "DELETE FROM login WHERE username=%s",
        (username,)
    )

    connection.commit()

    cur.close()

    return {"message": "Login Deleted Successfully"}