import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Students from "./features/Students";
import School from "./features/School";
import NavBar from "./components/NavBar";
import StudentDetails from "./Pages/StudentDetails";
import StudentForm from "./components/StudentForm";
import ClassView from "./Pages/ClassView";
import Teachers from "./features/Teachers";
import TeacherForm from "./components/TeacherForm";
import TeacherDetails from "./Pages/TeacherDetails";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Students />}></Route>
          <Route path="/:id" element={<StudentDetails />}></Route>
          <Route path="/school" element={<School />}></Route>
          <Route path="/editStudent" element={<StudentForm />}></Route>
          <Route path="/editTeacher" element={<TeacherForm />}></Route>
          <Route path="/class" element={<ClassView />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/teachers/:id" element={<TeacherDetails />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
