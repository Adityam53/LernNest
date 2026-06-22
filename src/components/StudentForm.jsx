import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "../features/studentsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const existingStudent = location.state?.studentDetails;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [marks, setMarks] = useState("");
  const [attendance, setAttendance] = useState("");
  const [error, setError] = useState("");

  const grades = ["O", "A", "B", "C", "D", "F"];

  useEffect(() => {
    if (!existingStudent) return;

    setName(existingStudent.name);
    setAge(existingStudent.age);
    setGrade(existingStudent.grade);
    setGender(existingStudent.gender);
    setMarks(existingStudent.marks || "");
    setAttendance(existingStudent.attendance || "");
  }, [existingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !grade ||
      !gender ||
      age === "" ||
      marks === "" ||
      attendance === ""
    ) {
      const message = "Please fill all required fields";

      setError(message);
      toast.error(message);

      return;
    }

    try {
      const studentData = {
        name,
        age: Number(age),
        grade,
        gender,
        marks: Number(marks),
        attendance: Number(attendance),
      };

      if (existingStudent) {
        await dispatch(
          updateStudentAsync({
            id: existingStudent._id,
            updatedStudent: studentData,
          }),
        ).unwrap();

        toast.success("Student updated successfully!");

        navigate("/students");
      } else {
        await dispatch(addStudentAsync(studentData)).unwrap();

        toast.success("Student added successfully!");
      }

      setName("");
      setAge("");
      setGrade("");
      setGender("");
      setMarks("");
      setAttendance("");
      setError("");

      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);

      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form page">
      <h2>{existingStudent ? "Edit" : "Add"} Student</h2>

      {error && <p className="subtle">{error}</p>}

      <div>
        <label>Name*</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
      </div>

      <div>
        <label>Age* (min 5 max 120)</label>
        <input
          type="number"
          value={age}
          min={5}
          max={120}
          onChange={(e) => {
            setAge(e.target.value);
            setError("");
          }}
        />
      </div>

      <div>
        <label>Grade*</label>
        <select
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
            setError("");
          }}
        >
          <option value="">Select Grade</option>

          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Gender*</label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => {
                setGender(e.target.value);
                setError("");
              }}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => {
                setGender(e.target.value);
                setError("");
              }}
            />
            Female
          </label>
        </div>
      </div>

      <div>
        <label>Marks* </label>
        <input
          type="number"
          value={marks}
          min={0}
          max={100}
          onChange={(e) => {
            setMarks(e.target.value);
            setError("");
          }}
        />
      </div>

      <div>
        <label>Attendance*</label>
        <input
          type="number"
          value={attendance}
          max={100}
          min={0}
          onChange={(e) => {
            setAttendance(e.target.value);
            setError("");
          }}
        />
      </div>

      <button className="btn-primary" type="submit">
        {existingStudent ? "Save Changes" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
