import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="badge">School Management System</span>

            <h1>School Management Made Simple.</h1>

            <p>
              Edvora provides a centralized platform to manage students,
              teachers, classroom performance, and school-wide analytics. Track
              academic progress, monitor attendance, and gain actionable
              insights through an intuitive dashboard.
            </p>

            <div className="hero-buttons">
              <Link to="/students">
                <button className="btn-secondary">Explore Students</button>
              </Link>

              <Link to="/school">
                <button className="btn-secondary">View Analytics</button>
              </Link>
            </div>
          </div>

          <div className="dashboard-preview">
            <div className="preview-card">
              <span className="badge">Student Management</span>

              <h3 style={{ marginTop: "1rem" }}>Manage Student Records</h3>

              <p>
                Maintain student profiles, attendance records, marks, and
                academic performance from a single organized workspace.
              </p>
            </div>

            <div className="preview-card">
              <span className="badge">Teacher Management</span>

              <h3 style={{ marginTop: "1rem" }}>Manage Teachers & Classes</h3>

              <p>
                Organize teacher information, assigned subjects, and classroom
                responsibilities while keeping everything accessible in one
                place.
              </p>
            </div>

            <div className="preview-card">
              <span className="badge">School Analytics</span>

              <h3 style={{ marginTop: "1rem" }}>
                Track School-Wide Performance
              </h3>

              <p>
                View statistics for students and teachers, identify top
                performers, and monitor overall academic trends across the
                institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-4">
        <div className="card">
          <h3>Student Management</h3>
          <p>
            Create, update, and monitor student records including attendance,
            marks, and academic progress.
          </p>
        </div>

        <div className="card">
          <h3>Teacher Management</h3>
          <p>
            Manage teacher profiles, subjects, and classroom assignments from a
            centralized dashboard.
          </p>
        </div>

        <div className="card">
          <h3>School Analytics</h3>
          <p>
            Access institution-wide insights, performance metrics, attendance
            trends, and top-performing students.
          </p>
        </div>

        <div className="card">
          <h3>Classroom View</h3>
          <p>
            Sort and filter students by class, attendance, marks, or performance
            to quickly find the information you need.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
