from fastapi import APIRouter
from database import connection

router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"]
)

@router.post("/")
def add_purchase(data: dict):

    cur = connection.cursor()

    cur.execute(
        """
        INSERT INTO purchased_courses
        (course_id, course_name, price, payment_method)
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["course_id"],
            data["course_name"],
            data["price"],
            data["payment_method"]
        )
    )

    connection.commit()
    cur.close()

    return {"message": "Purchase Saved"}