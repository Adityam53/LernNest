import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "../features/studentsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ClassView = () => {
  const dispatch = useDispatch();

  const { students, status, error, filter, sortBy } = useSelector(
    (state) => state.students,
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter((student) => {
    if (filter === "Boys") return student.gender === "Male";
    if (filter === "Girls") return student.gender === "Female";
    return true;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "marks") {
      return b.marks - a.marks;
    }
    if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="page stack">
      <h1>Class View</h1>

      <label htmlFor="">Filter By Gender</label>
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
      </select>
      <br />
      <label htmlFor="">Sort By Name</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="marks">Marks</option>
        <option value="attendance">Attendance</option>
      </select>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {sortedStudents.map((student) => (
        <Link key={student._id} to={`/${student._id}`}>
          <div className="card">
            {student.name} | {student.gender} | Marks: {student.marks} |
            Attendance: {student.attendance}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClassView;
