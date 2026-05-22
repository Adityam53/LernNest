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
    <div className="page">
      <div className="card">
        <h2>{teacher?.name}</h2>
        <div className="details">
          <p>Age: {teacher?.age}</p>
          <p>Gender: {teacher?.gender}</p>
          <p>
            Subjects:{" "}
            {teacher?.subjects?.map((sub) => (
              <span className="badge" key={sub}>
                {sub}
              </span>
            ))}
          </p>
        </div>

        <div className="row">
          <button onClick={handleDelete}>Delete</button>
          <Link to="/editTeacher" state={{ teacher }}>
            <button>Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TeacherDetails;
