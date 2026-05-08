import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const [addTeacher, setAddTeacher] = useState(false);

  const { teachers, error, status } = useSelector((state) => state.teachers);

  if (addTeacher) {
    return (
      <div className="page form-card">
        <TeacherForm onSuccess={() => setAddTeacher(false)} />
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="section-title">
        <div>
          <h2>Teachers</h2>
          <p>Manage faculty, subjects and educational workflow.</p>
        </div>

        <button onClick={() => setAddTeacher(true)}>Add Teacher</button>
      </div>

      {status === "loading" && <p>Loading teachers...</p>}
      {error && <p>{error}</p>}

      <div className="grid-3">
        {teachers.map((teacher) => (
          <Link to={`/teachers/${teacher._id}`} key={teacher._id}>
            <div className="card">
              <div className="card-top">
                <div className="avatar">{teacher.name.charAt(0)}</div>

                <span className="badge">Faculty</span>
              </div>

              <h3 style={{ marginTop: "1rem" }}>{teacher.name}</h3>

              <p>{teacher.gender}</p>

              <div className="row">
                {teacher.subjects.map((sub) => (
                  <span className="badge" key={sub}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
