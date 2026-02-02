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
  console.log(averageAttendance);

  const averageMarks =
    students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;
  console.log(averageMarks);

  const topStudent = students.reduce(
    (acc, curr) => (!acc || curr.marks > acc.marks ? curr : acc),
    null,
  );
  console.log(topStudent);

  return (
    <>
      <div className="page stack">
        <h1>School View</h1>
        <p>
          <strong>Total Students: </strong> {Number(totalStudents)}
        </p>
        <p>
          <strong>Average Attendance: </strong>{" "}
          {Number(averageAttendance?.toFixed(2))}
        </p>
        <p>
          <strong>Average Marks: </strong> {Number(averageMarks?.toFixed(2))}
        </p>
        <p>
          <strong>Top Student: </strong> {topStudent?.name}
        </p>
      </div>
    </>
  );
};

export default School;
