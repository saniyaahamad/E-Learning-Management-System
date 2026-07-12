import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="info123",
    database="elearningdb",
    autocommit=True
)