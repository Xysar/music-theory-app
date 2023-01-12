import Nav from "./Nav";
import Canvas from "./Canvas";
import Noteboard from "./Noteboard";

import React, { useRef, useEffect } from "react";

function NoteIdentityPage() {
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
    let value = 0;
    // eslint-disable-next-line default-case
    switch (y) {
      case 1:
        value = 7;
        break;
      case 2:
        value = 3;
        break;
      case 3:
        value = 10;
        break;
      case 4:
        value = 5;
        break;
    }
    value += x;
    value = value % 12;
    return value;
  };

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;
    let stringNames = ["E", "B", "G", "D", "A", "E"];
    let string = 0;
    for (let i = 25; i < 200; i += 30) {
      ctx.fillText(stringNames[string], 0, i + 7);
      string++;
      ctx.moveTo(25, i);
      ctx.lineTo(600, i);
    }
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 200);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();

    ctx.strokeStyle = "#999999";
    let curAddValue = addValue;
    let count = 1;
    for (let i = 105; i < 600; i += curAddValue) {
      ctx.fillText(count, i - 32, 225);
      count++;
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

    ctx.closePath();
    ctx.beginPath();
    ctx.arc(184, 100, 6, 0, 2 * Math.PI, false);
    ctx.arc(285, 100, 6, 0, 2 * Math.PI, false);
    ctx.arc(379, 100, 6, 0, 2 * Math.PI, false);
    ctx.arc(467, 100, 6, 0, 2 * Math.PI, false);

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(585, 70, 6, 0, 2 * Math.PI, false);
    ctx.arc(585, 130, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  };
  function handleNotePress(value) {
    if (
      value === fretCoordinates[curCoord.current.x][curCoord.current.y].note
    ) {
      console.log("pressed");
      randomizeNote();
    }
  }

  return (
    <div className="container">
      <Nav />
      <Canvas draw={draw} />
      <Noteboard handleClick={handleNotePress} />
    </div>
  );
}

export default NoteIdentityPage;
