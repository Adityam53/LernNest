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
    <div className="page stack class-view">
      <h1 className="class-title">Class View</h1>

      <div className="class-controls">
        <div className="control-group">
          <label>Filter By Gender</label>

          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <div className="control-group">
          <label>Sort By</label>

          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="student-list">
        {sortedStudents.map((student) => (
          <Link key={student._id} to={`/${student._id}`}>
            <div className="card class-card-minimal">
              <div className="student-row">
                <div className="student-left">
                  <div className="avatar-sm">{student.name.charAt(0)}</div>

                  <div>
                    <h3>{student.name}</h3>
                    <p
                      className={`teacher-gender ${
                        student.gender?.toLowerCase() === "male"
                          ? "gender-male"
                          : student.gender?.toLowerCase() === "female"
                            ? "gender-female"
                            : "gender-other"
                      }`}
                    >
                      {student.gender}
                    </p>{" "}
                  </div>
                </div>

                <div className="student-right">
                  <div className="student-stat">
                    <span>Marks</span>
                    <strong>{student.marks}</strong>
                  </div>

                  <div className="student-stat">
                    <span>Attendance</span>
                    <strong>{student.attendance}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassView;
