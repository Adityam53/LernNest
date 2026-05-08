import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="badge">Smart Education Platform</span>

            <h1>
              Learn Smarter.
              <br />
              Teach Better.
            </h1>

            <p>
              Learnest helps institutions manage students, teachers, performance
              analytics and classroom workflows through a modern, beautifully
              designed learning management system.
            </p>

            <div className="hero-buttons">
              <Link to="/students">
                <button>Explore Students</button>
              </Link>

              <Link to="/school">
                <button className="secondary-btn">View Analytics</button>
              </Link>
            </div>
          </div>

          <div className="dashboard-preview">
            <div className="preview-card">
              <span className="badge">Student Management</span>

              <h3 style={{ marginTop: "1rem" }}>Organize Student Records</h3>

              <p>
                Manage profiles, attendance, grades and academic performance in
                one centralized platform.
              </p>
            </div>

            <div className="preview-card">
              <span className="badge">Performance Tracking</span>

              <h3 style={{ marginTop: "1rem" }}>Monitor Classroom Progress</h3>

              <p>
                Track marks, attendance and learning outcomes through a modern
                classroom dashboard.
              </p>
            </div>

            <div className="preview-card">
              <span className="badge">Smart Dashboard</span>

              <h3 style={{ marginTop: "1rem" }}>
                Simplified Educational Workflow
              </h3>

              <p>
                Built to help institutions manage students and teachers with a
                clean, efficient interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-4">
        <div className="card">
          <h3>Student Management</h3>
          <p>Organize student profiles, attendance, marks and performance.</p>
        </div>

        <div className="card">
          <h3>Teacher Analytics</h3>
          <p>Manage faculty, subjects and classroom productivity.</p>
        </div>

        <div className="card">
          <h3>Performance Tracking</h3>
          <p>Analyze academic performance through real-time insights.</p>
        </div>

        <div className="card">
          <h3>Smart Classroom</h3>
          <p>Simplified workflows built for modern institutions.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
