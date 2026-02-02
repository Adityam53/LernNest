import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <h3>
          <Link to="/">School Management System</Link>
        </h3>

        <div className="hamburger" onClick={() => setOpen(true)}>
          <span />
          <span />
          <span />
        </div>

        <ul className={`nav-links ${open ? "show" : ""}`}>
          <li className="drawer-title">{open && "Explore"}</li>

          <li>
            <Link to="/" onClick={() => setOpen(false)}>
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
              Class
            </Link>
          </li>
          <li>
            <Link to="/school" onClick={() => setOpen(false)}>
              School
            </Link>
          </li>
        </ul>
      </nav>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
