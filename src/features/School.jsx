import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { fetchTeacherAsync } from "./teacherSlice";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";

const School = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const teachers = useSelector((state) => state.teachers.teachers);
  console.log(teachers);

  const {
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent,

    totalTeachers,
    subjectDistribution,
    averageTeacherAge,
    averageSubjectsPerTeacher,
  } = useSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeacherAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!students.length || !teachers.length) return;

    const totalStudents = students.length;

    const averageAttendance =
      students.reduce((acc, curr) => acc + curr.attendance, 0) / totalStudents;

    const averageMarks =
      students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;

    const topStudent = students.reduce(
      (acc, curr) => (!acc || curr.marks > acc.marks ? curr : acc),
      null,
    );

    const totalTeachers = teachers.length;

    const subjectDistribution = teachers.reduce((acc, teacher) => {
      teacher.subjects.forEach((subject) => {
        acc[subject] = (acc[subject] || 0) + 1;
      });

      return acc;
    }, {});

    const averageTeacherAge =
      teachers.reduce((acc, teacher) => acc + teacher.age, 0) / teachers.length;

    const averageSubjectsPerTeacher =
      teachers.reduce((acc, teacher) => acc + teacher.subjects.length, 0) /
      teachers.length;
    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,

        totalTeachers,
        subjectDistribution,

        averageTeacherAge,
        averageSubjectsPerTeacher,
      }),
    );

    dispatch(setTopStudent(topStudent));
  }, [students, teachers, dispatch]);

  return (
    <div className="stack">
      <div>
        <h2>School Analytics Dashboard</h2>
        <p>
          School-wide insights covering student performance, faculty data, and
          subject distribution.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Students</p>
          <h2>{totalStudents}</h2>
        </div>

        <div className="stat-card">
          <p>Total Teachers</p>
          <h2>{totalTeachers}</h2>
        </div>

        <div className="stat-card">
          <p>Average Attendance</p>
          <h2>{averageAttendance.toFixed(1)}%</h2>
        </div>

        <div className="stat-card">
          <p>Average Marks</p>
          <h2>{averageMarks.toFixed(1)}</h2>
        </div>

        <div className="stat-card">
          <p>Top Student</p>
          <h2>{topStudent?.name || "N/A"}</h2>
        </div>
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Subject Distribution</h3>

          <span className="badge">
            {Object.keys(subjectDistribution).length} Subjects
          </span>
        </div>

        <div className="subject-distribution-grid">
          {Object.entries(subjectDistribution).map(([subject, count]) => (
            <div key={subject} className="subject-distribution-item">
              <span>{subject}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card faculty-overview-card">
        <div className="section-title">
          <h3>Faculty Overview</h3>

          <span className="badge faculty-badge">Academic Staff</span>
        </div>

        <div className="overview-grid">
          <div className="overview-item">
            <span>Total Teachers</span>
            <strong>{totalTeachers}</strong>
          </div>

          <div className="overview-item">
            <span>Subjects Covered</span>
            <strong>{Object.keys(subjectDistribution).length}</strong>
          </div>

          <div className="overview-item">
            <span>Average Age</span>
            <strong>{averageTeacherAge.toFixed(0)}</strong>
          </div>

          <div className="overview-item">
            <span>Avg Subjects / Teacher</span>
            <strong>{averageSubjectsPerTeacher.toFixed(1)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default School;
