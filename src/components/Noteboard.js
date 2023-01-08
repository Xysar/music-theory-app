import React from "react";
import "./noteboard.css";
function Noteboard({ handleClick }) {
  return (
    <div className="note-board">
      <button onClick={() => handleClick(7)}>C</button>
      <button onClick={() => handleClick(8)}>C#</button>
      <button onClick={() => handleClick(9)}>D</button>
      <button onClick={() => handleClick(10)}>D#</button>
      <button onClick={() => handleClick(11)}>E</button>
      <button onClick={() => handleClick(0)}>F</button>
      <button onClick={() => handleClick(1)}>F#</button>
      <button onClick={() => handleClick(2)}>G</button>
      <button onClick={() => handleClick(3)}>G#</button>
      <button onClick={() => handleClick(4)}>A</button>
      <button onClick={() => handleClick(5)}>A#</button>
      <button onClick={() => handleClick(6)}>B</button>
    </div>
  );
}

export default Noteboard;
