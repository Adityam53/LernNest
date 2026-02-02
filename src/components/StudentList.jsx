import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentList = () => {
  const [addStudent, setAddStudent] = useState(false);

  const { students, error, status } = useSelector((state) => state.students);

  if (addStudent) {
    return (
      <div>
        <StudentForm onSuccess={() => setAddStudent(false)} />
        <button onClick={() => setAddStudent(false)}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="page stack">
      <h1>Students List</h1>

      <button onClick={() => setAddStudent(true)}>Add Student</button>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {students.map((student) => (
        <Link to={`/${student._id}`} key={student._id}>
          <div className="card">
            {student.name} (Age: {student.age})
          </div>{" "}
        </Link>
      ))}
    </div>
  );
};

export default StudentList;
