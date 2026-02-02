import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const [addTeacher, setAddTeacher] = useState(false);

  const { teachers, error, status } = useSelector((state) => state.teachers);

  if (addTeacher) {
    return (
      <div>
        <TeacherForm onSuccess={() => setAddTeacher(false)} />
        <button onClick={() => setAddTeacher(false)}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="page stack">
      <h1>Teachers List</h1>

      <button onClick={() => setAddTeacher(true)}>Add Teacher</button>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {teachers.map((teacher) => (
        <Link to={`/teachers/${teacher._id}`} key={teacher._id}>
          <div className="card">
            {teacher.name} (Age: {teacher.age}) {teacher.gender}
            <div>
              Subjects:
              {teacher.subjects.map((sub, index) => (
                <div key={index}>{sub}</div>
              ))}
            </div>
          </div>{" "}
        </Link>
      ))}
    </div>
  );
};

export default TeacherList;
