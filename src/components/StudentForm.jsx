import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "../features/studentsSlice";
import { useLocation } from "react-router-dom";

const StudentForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const existingStudent = location.state?.studentDetails;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [marks, setMarks] = useState("");
  const [attendance, setAttendance] = useState("");
  const [error, setError] = useState("");

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

    if (!name || !age || !grade || !gender) {
      setError("Please fill all required fields");
      return;
    }

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
    } else {
      await dispatch(addStudentAsync(studentData)).unwrap();
    }

    setName("");
    setAge("");
    setGrade("");
    setGender("");
    setMarks("");
    setAttendance("");

    onSuccess && onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form page">
      <h2>{existingStudent ? "Edit" : "Add"} Student</h2>

      {error && <p className="subtle">{error}</p>}

      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div>
        <label>Grade</label>
        <input value={grade} onChange={(e) => setGrade(e.target.value)} />
      </div>

      <div>
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>

      <div>
        <label>Marks</label>
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
      </div>

      <div>
        <label>Attendance</label>
        <input
          type="number"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />
      </div>

      <button type="submit">
        {existingStudent ? "Save Changes" : "Add Teacher"}
      </button>
    </form>
  );
};

export default StudentForm;
