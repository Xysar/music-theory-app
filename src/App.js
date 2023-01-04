import "./App.css";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";

import React, { useRef, useEffect } from "react";

function App() {
  let fretCoordinates = [];
  let addValue = 55;
  const curCoord = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let curAddValue = addValue;
    let curXOffset = 77.5;
    for (let i = 0; i < 12; i++) {
      fretCoordinates[i] = [];

      for (let j = 0; j < 6; j++) {
        let curYOffset = 25 + j * 30;
        fretCoordinates[i][j] = createFretNote(i, j, curXOffset, curYOffset);
      }
      curAddValue -= 1.45;
      curXOffset += curAddValue;
    }
    randomizeNote();
  }, []);

  const createFretNote = (x, y, xOffset, yOffset) => {
    return {
      fret: x,
      string: y,
      xOffset: xOffset,
      yOffset: yOffset,
      note: getNoteValue(x, y),
    };
  };

  const randomizeNote = () => {
    curCoord.current = {
      x: Math.floor(Math.random() * 12),
      y: Math.floor(Math.random() * 6),
    };
  };

  const getNoteValue = (x, y) => {
    return 0;
  };
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    for (let i = 25; i < 200; i += 30) {
      ctx.moveTo(0, i);
      ctx.lineTo(600, i);
    }
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 200);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();

    ctx.strokeStyle = "#999999";
    let curAddValue = addValue;
    for (let i = 105; i < 650; i += curAddValue) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 200);
      curAddValue -= 1.6;
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    if (fretCoordinates[0]) {
      ctx.arc(
        fretCoordinates[curCoord.current.x][curCoord.current.y].xOffset,
        fretCoordinates[curCoord.current.x][curCoord.current.y].yOffset,
        10,
        0,
        2 * Math.PI,
        false
      );
    }

    ctx.fillStyle = "red";
    ctx.fill();

    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  };

  return (
    <div className="container">
      <Nav />
      <Canvas draw={draw} />
      <button onClick={() => randomizeNote()}>New Fret</button>
    </div>
  );
}

export default App;
