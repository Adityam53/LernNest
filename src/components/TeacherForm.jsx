import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addTeacherAsync, updateTeacherAsync } from "../features/teacherSlice";

const TeacherForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const existingTeacher = location.state?.teacher;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!existingTeacher) return;

    setName(existingTeacher.name);
    setAge(existingTeacher.age);
    setGender(existingTeacher.gender);
    setSubjects(existingTeacher.subjects);
  }, [existingTeacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !gender || !subjects.length === 0) {
      setError("Please fill all required fields");
      return;
    }

    const teacherData = {
      name,
      age: Number(age),
      gender,
      subjects,
    };

    if (existingTeacher) {
      await dispatch(
        updateTeacherAsync({
          id: existingTeacher._id,
          updatedData: teacherData,
        }),
      ).unwrap();
    } else {
      await dispatch(addTeacherAsync(teacherData)).unwrap();
    }

    setName("");
    setAge("");
    setGender("");
    setSubjects([]);

    onSuccess && onSuccess();
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSubjects([...subjects, value]);
    } else {
      setSubjects(subjects.filter((s) => s !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form page">
      <h2>{existingTeacher ? "Edit" : "Add"} Teacher</h2>

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
        <label>Gender</label>
        <div className="radio-group">
          <label className="row">
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>

          <label className="row">
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
        <label>Subjects</label>
        <div className="checkbox-group">
          {["Mathematics", "Physics", "Chemistry"].map((sub) => (
            <label key={sub} className="row">
              <input
                type="checkbox"
                checked={subjects.includes(sub)}
                value={sub}
                onChange={handleChange}
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      <button type="submit">{existingTeacher ? "Save" : "Add Teacher"}</button>
    </form>
  );
};

export default TeacherForm;
