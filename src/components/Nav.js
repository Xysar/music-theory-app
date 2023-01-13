import React from "react";
import "./nav.css";
function Nav() {
  return (
    <div className="nav-container">
      {" "}
      <nav>
        <ul className="navigation-list">
          <li>
            <a href="https://xysar.github.io/note-identification">
              Note Identification
            </a>
          </li>
          <li>
            <a href="https://xysar.github.io/guitar-scales">Scale Reference</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
