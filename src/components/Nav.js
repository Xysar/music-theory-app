import React from "react";
import "./nav.css";
function Nav() {
  return (
    <div className="nav-container">
      <nav className="navigation-bar">
        <ul className="navigation-list">
          <li className="nav-button">
            <a href="/">Note Identification</a>
          </li>
          <li className="nav-button">
            <a href="scales">Scale Reference</a>
          </li>
          <li className="nav-button">
            {" "}
            <a href="chords">Chord Identification</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
