import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const [addTeacher, setAddTeacher] = useState(false);

  const { teachers, error, status } = useSelector((state) => state.teachers);

  if (addTeacher) {
    return (
      <div className="form-card">
        <TeacherForm onSuccess={() => setAddTeacher(false)} />
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="section-title">
        <div>
          <h2 className="class-title">Teachers</h2>
          <p>Manage faculty, subjects and educational workflow.</p>
        </div>

        <button className="btn-secondary" onClick={() => setAddTeacher(true)}>
          Add Teacher
        </button>
      </div>
      {status === "loading" && (
        <div className="students-loading">Loading teachers...</div>
      )}

      {error && <div className="students-error">{error}</div>}

      <div className="grid-3">
        {teachers.map((teacher) => (
          <Link
            to={`/teachers/${teacher._id}`}
            key={teacher._id}
            className="student-link"
          >
            <div className="card teacher-card">
              <div className="card-top">
                <div className="teacher-avatar">{teacher.name.charAt(0)}</div>

                <span className="badge faculty-badge">Faculty</span>
              </div>

              <h3 className="teacher-name">{teacher.name}</h3>

              <span
                className={`teacher-gender ${
                  teacher.gender?.toLowerCase() === "male"
                    ? "gender-male"
                    : teacher.gender?.toLowerCase() === "female"
                      ? "gender-female"
                      : "gender-other"
                }`}
              >
                {teacher.gender}
              </span>

              <div className="subject-section">
                <span className="subject-label">Subjects Taught</span>

                <div className="subject-list">
                  {teacher.subjects.slice(0, 3).map((sub) => (
                    <span className="subject-badge" key={sub}>
                      {sub}
                    </span>
                  ))}

                  {teacher.subjects.length > 3 && (
                    <span className="subject-badge">
                      +{teacher.subjects.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="subject-count">
                <span>Total Subjects</span>
                <strong>{teacher.subjects.length}</strong>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
