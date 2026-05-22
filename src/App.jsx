import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "./features/Students";
import School from "./features/School";
import NavBar from "./components/NavBar";
import StudentDetails from "./Pages/StudentDetails";
import StudentForm from "./components/StudentForm";
import ClassView from "./Pages/ClassView";
import Teachers from "./features/Teachers";
import TeacherForm from "./components/TeacherForm";
import TeacherDetails from "./Pages/TeacherDetails";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/students" element={<Students />} />
          <Route path="/:id" element={<StudentDetails />}></Route>
          <Route path="/school" element={<School />}></Route>
          <Route path="/editStudent" element={<StudentForm />}></Route>
          <Route path="/editTeacher" element={<TeacherForm />}></Route>
          <Route path="/class" element={<ClassView />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/teachers/:id" element={<TeacherDetails />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />{" "}
      </Router>
    </>
  );
}

export default App;
