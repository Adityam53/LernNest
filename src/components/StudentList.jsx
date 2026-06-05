import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentList = () => {
  const [addStudent, setAddStudent] = useState(false);

  const { students, error, status } = useSelector((state) => state.students);

  if (addStudent) {
    return (
      <div className="form-card">
        <StudentForm onSuccess={() => setAddStudent(false)} />
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="section-title">
        <div className="students-header">
          <h2 className="class-title">Students</h2>
          <p>Manage enrolled students and academic performance.</p>
        </div>

        <button className="btn-secondary" onClick={() => setAddStudent(true)}>
          + Add Student
        </button>
      </div>

      {status === "loading" && (
        <div className="students-loading">Loading students...</div>
      )}

      {error && <div className="students-error">{error}</div>}

      <div className="grid-3">
        {students.map((student) => (
          <Link
            to={`/${student._id}`}
            key={student._id}
            className="student-link"
          >
            <div className="card student-card">
              <div className="card-top">
                <div className="avatar">{student.name.charAt(0)}</div>

                <span className="badge">Grade {student.grade}</span>
              </div>

              <h3 className="student-name">{student.name}</h3>

              <p
                className={`teacher-gender ${
                  student.gender?.toLowerCase() === "male"
                    ? "gender-male"
                    : student.gender?.toLowerCase() === "female"
                      ? "gender-female"
                      : "gender-other"
                }`}
              >
                {student.gender}
              </p>

              <div className="student-stats">
                <div
                  className={`student-stat-card ${
                    student.attendance >= 85
                      ? "attendance-good"
                      : student.attendance >= 70
                        ? "attendance-average"
                        : "attendance-low"
                  }`}
                >
                  <span>Attendance</span>
                  <strong>{student.attendance}%</strong>
                </div>

                <div
                  className={`student-stat-card ${
                    student?.marks >= 80
                      ? "marks-high"
                      : student?.marks >= 60
                        ? "marks-average"
                        : "marks-low"
                  }`}
                >
                  <span>Marks</span>
                  <strong>{student?.marks}</strong>
                </div>

                <div className="student-stat-card">
                  <span>Age</span>
                  <strong>{student.age}</strong>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
