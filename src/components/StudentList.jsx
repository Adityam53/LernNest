import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentList = () => {
  const [addStudent, setAddStudent] = useState(false);

  const { students, error, status } = useSelector((state) => state.students);

  if (addStudent) {
    return (
      <div className="page form-card">
        <StudentForm onSuccess={() => setAddStudent(false)} />
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="section-title">
        <div>
          <h2>Students</h2>
          <p>Manage enrolled students and academic performance.</p>
        </div>

        <button onClick={() => setAddStudent(true)}>Add Student</button>
      </div>

      {status === "loading" && <p>Loading students...</p>}
      {error && <p>{error}</p>}

      <div className="grid-3">
        {students.map((student) => (
          <Link to={`/${student._id}`} key={student._id}>
            <div className="card">
              <div className="card-top">
                <div className="avatar">{student.name.charAt(0)}</div>

                <span className="badge">Grade {student.grade}</span>
              </div>

              <h3 style={{ marginTop: "1rem" }}>{student.name}</h3>

              <p>{student.gender}</p>

              <div className="details">
                <p>Attendance: {student.attendance}%</p>
                <p>Marks: {student.marks}</p>
                <p>Age: {student.age}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
