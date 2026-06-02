import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteStudentAsync, fetchStudents } from "../features/studentsSlice";

const StudentDetails = () => {
  const { students, error, status } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteStudentAsync(id)).unwrap();

      toast.success("Student deleted successfully!");

      navigate("/students");
    } catch (err) {
      toast.error(
        err?.message || "Failed to delete student. Please try again.",
      );
    }
  };

  const studentDetails = students.find((s) => s._id === id);
  console.log(studentDetails);

  if (status === "loading") return <p>Loading...</p>;
  if (!studentDetails && students.length > 0) return <p>Student not found</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      {/* HERO */}
      <div className="student-hero">
        <div className="student-profile">
          <div className="avatar student-avatar-lg">
            {studentDetails?.name?.charAt(0)}
          </div>

          <div>
            <h1 className="student-title">{studentDetails?.name}</h1>

            <p className="student-subtitle">{studentDetails?.gender}</p>
          </div>
        </div>
      </div>

      {/* KEY METRICS */}
      <div className="student-stats">
        <div
          className={`student-stat-card ${
            studentDetails?.attendance >= 85
              ? "attendance-good"
              : studentDetails?.attendance >= 70
                ? "attendance-average"
                : "attendance-low"
          }`}
        >
          <span>Attendance</span>
          <strong>{studentDetails?.attendance}%</strong>
        </div>

        <div
          className={`student-stat-card ${
            studentDetails?.marks >= 80
              ? "marks-high"
              : studentDetails?.marks >= 60
                ? "marks-average"
                : "marks-low"
          }`}
        >
          <span>Marks</span>
          <strong>{studentDetails?.marks}</strong>
        </div>

        <div
          className={`student-stat-card ${
            ["O", "A"].includes(studentDetails?.grade)
              ? "grade-high"
              : ["B", "C"].includes(studentDetails?.grade)
                ? "grade-average"
                : "grade-low"
          }`}
        >
          <span>Grade</span>
          <strong>{studentDetails?.grade}</strong>
        </div>

        <div className="student-stat-card neutral-card">
          <span>Age</span>
          <strong>{studentDetails?.age}</strong>
        </div>
      </div>

      {/* ACADEMIC INSIGHTS */}
      <div className="student-section">
        <h3>Academic Insights</h3>

        <div className="info-grid">
          <div className="info-item">
            <span>Performance</span>

            <strong
              className={
                studentDetails?.marks >= 80
                  ? "text-success"
                  : studentDetails?.marks >= 60
                    ? "text-warning"
                    : "text-danger"
              }
            >
              {studentDetails?.marks >= 80
                ? "High Performer"
                : studentDetails?.marks >= 60
                  ? "Good Progress"
                  : "Needs Improvement"}
            </strong>
          </div>

          <div className="info-item">
            <span>Academic Standing</span>

            <strong
              className={
                ["O", "A"].includes(studentDetails?.grade)
                  ? "text-success"
                  : ["B", "C"].includes(studentDetails?.grade)
                    ? "text-warning"
                    : "text-danger"
              }
            >
              {["O", "A"].includes(studentDetails?.grade)
                ? "Excellent"
                : ["B", "C"].includes(studentDetails?.grade)
                  ? "Satisfactory"
                  : "Needs Improvement"}
            </strong>
          </div>

          <div className="info-item">
            <span>Participation Risk</span>

            <strong
              className={
                studentDetails?.attendance >= 70
                  ? "text-success"
                  : "text-danger"
              }
            >
              {studentDetails?.attendance >= 70 ? "Low Risk" : "At Risk"}
            </strong>
          </div>

          <div className="info-item">
            <span>Overall Status</span>

            <strong
              className={
                studentDetails?.marks >= 80 && studentDetails?.attendance >= 85
                  ? "text-success"
                  : studentDetails?.marks >= 60
                    ? "text-warning"
                    : "text-danger"
              }
            >
              {studentDetails?.marks >= 80 && studentDetails?.attendance >= 85
                ? "Outstanding"
                : studentDetails?.marks >= 60
                  ? "Stable"
                  : "Needs Support"}
            </strong>
          </div>
        </div>
      </div>

      {/* STUDENT INFORMATION */}
      <div className="student-section">
        <h3>Student Information</h3>

        <div className="info-grid">
          <div className="info-item">
            <span>Gender</span>
            <strong>{studentDetails?.gender}</strong>
          </div>

          <div className="info-item">
            <span>Age Group</span>
            <strong>
              {studentDetails?.age < 16
                ? "Junior"
                : studentDetails?.age < 24
                  ? "Middle School"
                  : "Senior"}
            </strong>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="student-page-actions">
        <Link to="/editStudent" state={{ studentDetails }}>
          <button className="btn-primary">Edit Student</button>
        </Link>

        <button className="btn-danger" onClick={handleDelete}>
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
