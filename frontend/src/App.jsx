import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import Enrollments from "./pages/Enrollments";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import Marks from "./pages/Marks";
import Attendance from "./pages/Attendance";
import CourseDetails from "./pages/CourseDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />

<Route path="/home" element={<Home />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/students"
    element={
      <ProtectedRoute>
        <Students />
      </ProtectedRoute>
    }
  />

  <Route
    path="/teachers"
    element={
      <ProtectedRoute>
        <Teachers />
      </ProtectedRoute>
    }
  />

  <Route
    path="/courses"
    element={
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    }
  />

  <Route
    path="/subjects"
    element={
      <ProtectedRoute>
        <Subjects />
      </ProtectedRoute>
    }
  />

  <Route
    path="/enrollments"
    element={
      <ProtectedRoute>
        <Enrollments />
      </ProtectedRoute>
    }
  />

  <Route
    path="/assignments"
    element={
      <ProtectedRoute>
        <Assignments />
      </ProtectedRoute>
    }
  />

  <Route
    path="/quizzes"
    element={
      <ProtectedRoute>
        <Quizzes />
      </ProtectedRoute>
    }
  />

  <Route
    path="/marks"
    element={
      <ProtectedRoute>
        <Marks />
      </ProtectedRoute>
    }
  />

  <Route
    path="/attendance"
    element={
      <ProtectedRoute>
        <Attendance />
      </ProtectedRoute>
    }
  />
  <Route path="/cart" element={<Cart />} />

<Route path="/payment" element={<Payment />} />
 
 <Route 
path="/course/:id" 
element={<CourseDetails/>}
/>
  </Routes>
    </BrowserRouter>
  );
}

export default App;