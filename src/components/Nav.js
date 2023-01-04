import React from "react";
import "./nav.css";
function Nav() {
  return (
    <div className="nav-container">
      <nav className="navigation-bar">
        <ul className="navigation-list">
          <li className="nav-button">
            <a href="#">Note Identification</a>
          </li>
          <li className="nav-button">Scale Reference</li>
          <li className="nav-button">Chord Identification</li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
