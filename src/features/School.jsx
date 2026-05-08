import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";

const School = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const students = useSelector((state) => state.students.students);

  const totalStudents = students?.length;

  const averageAttendance =
    students.reduce((acc, curr) => acc + curr.attendance, 0) / totalStudents;

  const averageMarks =
    students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;

  const topStudent = students.reduce(
    (acc, curr) => (!acc || curr.marks > acc.marks ? curr : acc),
    null,
  );

  return (
    <div className="stack">
      <div>
        <h2>Analytics Dashboard</h2>
        <p>Institution insights and academic performance overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Students</p>
          <h2>{totalStudents}</h2>
        </div>

        <div className="stat-card">
          <p>Average Attendance</p>
          <h2>{averageAttendance?.toFixed(1)}%</h2>
        </div>

        <div className="stat-card">
          <p>Average Marks</p>
          <h2>{averageMarks?.toFixed(1)}</h2>
        </div>

        <div className="stat-card">
          <p>Top Student</p>
          <h2>{topStudent?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default School;
