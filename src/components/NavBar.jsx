import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="brand-wrapper">
          <Link to="/" className="brand">
            <h3>Edvora</h3>
            <span>Modern Academic Management Platform</span>
          </Link>

          <button
            className={`nav-toggle ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <FiMenu />
          </button>
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
