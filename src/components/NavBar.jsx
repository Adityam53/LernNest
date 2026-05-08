import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <Link to="/" className="brand">
          <h3>Learnest</h3>
          <span>Modern Learning Platform</span>
        </Link>

        <div className="hamburger" onClick={() => setOpen(true)}>
          <span />
          <span />
          <span />
        </div>

        <ul className={`nav-links ${open ? "show" : ""}`}>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/students" onClick={() => setOpen(false)}>
              Students
            </Link>
          </li>

          <li>
            <Link to="/teachers" onClick={() => setOpen(false)}>
              Teachers
            </Link>
          </li>

          <li>
            <Link to="/class" onClick={() => setOpen(false)}>
              Classroom
            </Link>
          </li>

          <li>
            <Link to="/school" onClick={() => setOpen(false)}>
              Analytics
            </Link>
          </li>
        </ul>
      </nav>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
