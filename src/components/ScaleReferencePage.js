import Nav from "./Nav";
import Canvas from "./Canvas";
import NoteBoard from "./Noteboard";
import "./scalereference.css";
import React, { useRef, useEffect } from "react";

function ScaleReferencePage() {
  let fretCoordinates = [];
  let addValue = 60;
  const currentKey = useRef(7);
  const showBlues = useRef(true);
  const showOnlyPenta = useRef(false);

  const noteLetters = [
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
  ];

  const majorScale = [
    "R",
    "N",
    "P",
    "B",
    "P",
    "M",
    "N",
    "P",
    "N",
    "P",
    "N",
    "M",
  ];

  useEffect(() => {
    let curAddValue = addValue;
    let curXOffset = 77.5;
    for (let i = 0; i < 21; i++) {
      fretCoordinates[i] = [];
      for (let j = 0; j < 6; j++) {
        let curYOffset = 25 + j * 50;
        fretCoordinates[i][j] = createFretNote(i, j, curXOffset, curYOffset);
      }
      if (i < 15) {
        curAddValue -= 1.5;
      } else {
        curAddValue = 39;
      }
      curXOffset += curAddValue;
    }
  }, []);

  const toggleBlues = () => {
    showBlues.current = !showBlues.current;
    let bluesButton = document.getElementsByClassName("blues-button")[0];
    if (showBlues.current) {
      bluesButton.style.backgroundColor = "#000080";
    } else {
      bluesButton.style.backgroundColor = "#000000";
    }
  };
  const togglePentatonic = () => {
    showOnlyPenta.current = !showOnlyPenta.current;
    let pentaButton = document.getElementsByClassName("pentatonic-button")[0];
    if (showOnlyPenta.current) {
      pentaButton.style.backgroundColor = "#800000";
    } else {
      pentaButton.style.backgroundColor = "#000000";
    }
  };

  const createFretNote = (x, y, xOffset, yOffset) => {
    return {
      fret: x,
      string: y,
      xOffset: xOffset,
      yOffset: yOffset,
      note: getNoteValue(x, y),
    };
  };

  const handleNotePress = (noteValue) => {
    currentKey.current = noteValue;
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
    for (let i = 25; i < 300; i += 50) {
      ctx.fillText(stringNames[string], 0, i + 7);
      string++;
      ctx.moveTo(25, i);
      ctx.lineTo(1010, i);
    }
    ctx.moveTo(47.5, 0);
    ctx.lineTo(47.5, 300);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();

    ctx.strokeStyle = "#999999";
    let curAddValue = addValue;
    let count = 1;
    for (let i = 105; i < 1000; i += curAddValue) {
      ctx.fillText(count, i - 32, 325);
      count++;
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 300);
      if (count < 15) {
        curAddValue -= 1.6;
      }
    }
    ctx.fillText(count, 985, 325);
    ctx.stroke();
    ctx.closePath();

    //scale logic
    if (fretCoordinates[0]) {
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 6; j++) {
          let curNoteValue = fretCoordinates[i][j].note;
          let transposedNoteValue = 0;
          if (curNoteValue - currentKey.current < 0) {
            transposedNoteValue = 12 + (curNoteValue - currentKey.current);
          } else {
            transposedNoteValue = curNoteValue - currentKey.current;
          }

          if (majorScale[transposedNoteValue] === "N") {
            continue;
          }
          ctx.beginPath();

          if (majorScale[transposedNoteValue] === "R") {
            ctx.fillStyle = "#FFA500";
          } else if (majorScale[transposedNoteValue] === "P") {
            ctx.fillStyle = "#800000";
          } else if (majorScale[transposedNoteValue] === "B") {
            if (showBlues.current) {
              ctx.fillStyle = "#000080";
            } else {
              continue;
            }
          } else {
            if (showOnlyPenta.current) {
              continue;
            }
            ctx.fillStyle = "#000000";
          }

          ctx.arc(
            fretCoordinates[i][j].xOffset,
            fretCoordinates[i][j].yOffset,
            18,
            0,
            2 * Math.PI,
            false
          );
          ctx.fill();
          ctx.fillStyle = "white";

          ctx.fillText(
            noteLetters[curNoteValue],
            fretCoordinates[i][j].xOffset - 10,
            fretCoordinates[i][j].yOffset + 7
          );
          ctx.closePath();
        }
      }
    }

    //fret marks

    ctx.beginPath();
    ctx.arc(190, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(300, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(405, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(505, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(760, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(837, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(917, 150, 6, 0, 2 * Math.PI, false);
    ctx.arc(995, 150, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(637, 100, 6, 0, 2 * Math.PI, false);
    ctx.arc(637, 200, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div className="scale-container">
      <Nav />
      <Canvas draw={draw} />
      <div className="toolbox">
        {" "}
        <button
          className="toggle-buttons pentatonic-button"
          onClick={() => {
            togglePentatonic();
          }}
        >
          Pentatonic Only
        </button>
        <button
          className="toggle-buttons blues-button"
          onClick={() => {
            toggleBlues();
          }}
        >
          Blues Notes
        </button>
        <NoteBoard handleClick={handleNotePress} />
      </div>
    </div>
  );
}

export default ScaleReferencePage;
