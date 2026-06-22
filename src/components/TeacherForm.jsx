import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addTeacherAsync, updateTeacherAsync } from "../features/teacherSlice";
import { toast } from "react-toastify";

const TeacherForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

    if (!name.trim() || age === "" || !gender || subjects.length === 0) {
      const message = "Please fill all required fields";

      setError(message);

      toast.error(message);

      return;
    }

    try {
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

        toast.success("Teacher updated successfully!");

        navigate("/teachers");
      } else {
        await dispatch(addTeacherAsync(teacherData)).unwrap();

        toast.success("Teacher added successfully!");
      }

      setName("");
      setAge("");
      setGender("");
      setSubjects([]);
      setError("");

      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);

      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setError("");

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
        <label>Age* (min 18 max 120)</label>
        <input
          type="number"
          value={age}
          min={18}
          max={120}
          onChange={(e) => {
            setAge(e.target.value);
            setError("");
          }}
        />
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
        <label>Subjects*</label>

        <div className="checkbox-group">
          {[
            "English Literature",
            "Grammar",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "Economics",
            "Business Studies",
            "Art",
            "Design",
          ].map((sub) => (
            <label key={sub}>
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

      <button className="btn-primary" type="submit">
        {existingTeacher ? "Save" : "Add Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;
