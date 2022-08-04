import { useSelector } from "react-redux";
import { FaRedo, FaSync, FaUndo } from "react-icons/fa";
import { useAppDispatch } from "../utils/hooks";
import { redo, undo } from "../features/historyIndex/historyIndexSlice";
import {
  resetCanvas,
  strokesLengthSelector,
} from "../features/strokes/strokesSlice";

const ButtonsPanel = () => {
  const dispatch = useAppDispatch();
  const undoLimit = useSelector(strokesLengthSelector);

  return (
    <div className="fixed top-10 right-10 bg-teal-700 flex flex-col justify-center items-center p-5 space-y-5 rounded-md">
      <div className="relative group cursor-pointer transition-all duration-300">
        <button
          className="text-2xl text-white"
          onClick={() => dispatch(resetCanvas())}
        >
          <FaSync />
        </button>
        <div className="absolute top-0 right-12 w-auto px-2 py-1 bg-slate-500 text-base text-white rounded transition-all duration-200 group-hover:scale-100 scale-0 origin-left">
          Reset
        </div>
      </div>

      <div className="relative group cursor-pointer transition-all duration-300">
        <button
          className="text-2xl text-white"
          onClick={() => dispatch(redo())}
        >
          <FaRedo />
        </button>
        <div className="absolute top-0 right-12 w-auto px-2 py-1 bg-slate-500 text-base text-white rounded transition-all duration-200 group-hover:scale-100 scale-0 origin-left">
          Redo
        </div>
      </div>

      <div className="relative group cursor-pointer transition-all duration-300">
        <button
          className="text-2xl text-white"
          onClick={() => dispatch(undo(undoLimit))}
        >
          <FaUndo />
        </button>
        <div className="absolute top-0 right-12 w-auto px-2 py-1 bg-slate-500 text-base text-white rounded transition-all duration-200 group-hover:scale-100 scale-0 origin-left">
          Undo
        </div>
      </div>
    </div>
  );
};

export default ButtonsPanel;
