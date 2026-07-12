# E-Learning System

## Project Overview

E-Learning System is a full-stack web application developed to manage online learning activities. The system provides a platform for students, teachers, and administrators to manage courses, subjects, assignments, quizzes, marks, attendance, and course purchases.

The project consists of two main parts:

- Backend: FastAPI + MySQL
- Frontend: React.js

---

## Features

### Student Module
- Student registration and login
- View available courses
- Enroll in courses
- View assignments
- Attend quizzes
- Check marks and attendance
- Purchase courses

### Teacher Module
- Manage teacher details
- Create and manage courses
- Manage assignments
- Upload quizzes
- Update student marks

### Course Management
- Add courses
- View courses
- Update course details
- Delete courses

### Academic Management
- Subject management
- Assignment management
- Quiz management
- Marks management
- Attendance tracking

### Authentication
- User login system
- Credential verification
- Secure backend APIs

---

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend
- Python
- FastAPI
- Uvicorn
- MySQL
- SQL Queries

### Tools
- Visual Studio Code
- Git
- GitHub
- MySQL Workbench

---

## Project Structure

```
E-Learning-System
│
├── backend
│   ├── main.py
│   ├── database.py
│   ├── login.py
│   ├── students.py
│   ├── teachers.py
│   ├── courses.py
│   ├── subjects.py
│   ├── enrollments.py
│   ├── assignments.py
│   ├── quizzes.py
│   ├── marks.py
│   ├── attendance.py
│   └── purchase.py
│
├── frontend
│   └── src
│       ├── components
│       ├── pages
│       ├── images
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## Backend Setup

### 1. Navigate to backend folder

```
cd backend
```

### 2. Create virtual environment

```
python -m venv .venv
```

### 3. Activate environment

Windows:

```
.venv\Scripts\activate
```

### 4. Install dependencies

```
pip install fastapi uvicorn mysql-connector-python
```

### 5. Run backend server

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

### 1. Navigate to frontend

```
cd frontend
```

### 2. Install packages

```
npm install
```

### 3. Start React application

```
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## Database Configuration

The project uses MySQL database.

Create database:

```
CREATE DATABASE elearningdb;
```

Update database connection details in:

```
backend/database.py
```

Configure:

- Host
- Username
- Password
- Database name

---

## API Modules

| Module | Description |
|---|---|
| Login API | User authentication |
| Student API | Student CRUD operations |
| Teacher API | Teacher management |
| Course API | Course CRUD operations |
| Subject API | Subject management |
| Enrollment API | Course enrollment |
| Assignment API | Assignment management |
| Quiz API | Quiz management |
| Marks API | Student marks |
| Attendance API | Attendance tracking |
| Purchase API | Course purchase |

---

## CRUD Operations

The application supports:

### Create
- Add students
- Add teachers
- Add courses
- Add assignments
- Add quizzes

### Read
- View students
- View courses
- View marks
- View attendance

### Update
- Update student details
- Update course information
- Update marks

### Delete
- Remove students
- Delete courses
- Delete records

---

## Future Enhancements

- Online video lectures
- Certificate generation
- Payment gateway integration
- Admin dashboard
- Email notifications
- Cloud deployment

---
