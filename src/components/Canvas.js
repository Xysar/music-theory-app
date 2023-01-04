import React, { useEffect, useRef } from "react";
import useCanvas from "./useCanvas";

function Canvas(props) {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas className="main-canvas" ref={canvasRef} {...rest} />;
}

export default Canvas;
