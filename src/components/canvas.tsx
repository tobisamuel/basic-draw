import { useEffect } from "react";
import { clearCanvas, drawStroke, setCanvasSize } from "../utils/canvasUtils";
import { useCanvas } from "../utils/canvasContext";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../utils/hooks";
import { endStroke } from "../features/sharedActions";
import {
  beginStroke,
  updateStroke,
} from "../features/currentStroke/currentStrokeSlice";
import { currentStrokeSelector } from "../features/currentStroke/currentStrokeSlice";
import { historyIndexSelector } from "../features/historyIndex/historyIndexSlice";
import { strokesSelector } from "../features/strokes/strokesSlice";

const WIDTH = 1130;
const HEIGHT = 700;

const Canvas = () => {
  const dispatch = useAppDispatch();
  const currentStroke = useSelector(currentStrokeSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);
  const canvasRef = useCanvas();

  // helper function to get both canvas and its 2d context
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  // used to tell if we are currently drawing
  const isDrawing = !!currentStroke.points.length;

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, []);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  });

  // useeffect to clear screen and draw only strokes that were not undone
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [historyIndex, strokes]);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex }));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default Canvas;
