import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
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
    if (window.confirm("Delete this student?")) {
      await dispatch(deleteStudentAsync(id)).unwrap();
      navigate("/");
    }
  };

  const studentDetails = students.find((s) => s._id === id);
  console.log(studentDetails);

  if (status === "loading") return <p>Loading...</p>;
  if (!studentDetails && students.length > 0) return <p>Student not found</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <div className="card">
        <h2>{studentDetails?.name}</h2>

        <div className="details">
          <p>
            <span>Age:</span> {studentDetails?.age}
          </p>
          <p>
            <span>Gender:</span> {studentDetails?.gender}
          </p>
          <p>
            <span>Grade:</span> {studentDetails?.grade}
          </p>
          <p>
            <span>Marks:</span> {studentDetails?.marks}
          </p>
          <p>
            <span>Attendance:</span> {studentDetails?.attendance}
          </p>
        </div>

        <div className="row">
          <button onClick={handleDelete}>Delete</button>
          <Link to="/editStudent" state={{ studentDetails }}>
            <button>Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
