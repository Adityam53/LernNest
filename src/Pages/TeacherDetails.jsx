import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTeacherAsync,
  fetchTeacherAsync,
} from "../features/teacherSlice";
import { toast } from "react-toastify";

const TeacherDetails = () => {
  const { teachers, error, status } = useSelector((state) => state.teachers);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTeacherAsync());
  }, [teachers.length, dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTeacherAsync(id)).unwrap();

      toast.success("Teacher deleted successfully!");

      navigate("/teachers");
    } catch (err) {
      toast.error(
        err?.message || "Failed to delete teacher. Please try again.",
      );
    }
  };

  const teacher = teachers.find((teacher) => teacher._id === id);

  if (status === "loading") return <p>Loading...</p>;
  if (!teacher && teachers.length > 0) return <p>Teacher not found</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stack">
      <div className="card teacher-hero-card">
        <div className="student-profile">
          <div className="teacher-avatar teacher-avatar-lg">
            {teacher?.name?.charAt(0)}
          </div>

          <div>
            <h1 className="student-title">{teacher?.name}</h1>

            <span
              className={`teacher-gender-badge ${
                teacher?.gender === "Male"
                  ? "gender-male"
                  : teacher?.gender === "Female"
                    ? "gender-female"
                    : "gender-other"
              }`}
            >
              {teacher?.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Overview */}

      <div className="student-stats">
        <div className="student-stat-card neutral-card">
          <span>Age</span>
          <strong>{teacher?.age}</strong>
        </div>

        <div className="student-stat-card subjects-card">
          <span>Subjects</span>
          <strong>{teacher?.subjects?.length}</strong>
        </div>

        <div className="student-stat-card faculty-card">
          <span>Faculty Status</span>

          <strong>
            {teacher?.subjects?.length >= 4 ? "Senior" : "Active"}
          </strong>
        </div>
      </div>

      {/* Subjects */}

      <div className="student-section">
        <h3>Assigned Subjects</h3>

        <div className="teacher-subjects-grid">
          {teacher?.subjects?.map((sub) => (
            <span className="teacher-subject-badge" key={sub}>
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}

      <div className="student-page-actions">
        <Link to="/editTeacher" state={{ teacher }}>
          <button className="btn-primary">Edit Teacher</button>
        </Link>

        <button className="btn-danger" onClick={handleDelete}>
          Delete Teacher
        </button>
      </div>
    </div>
  );
};
export default TeacherDetails;
