import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../utils/hooks";
import {
  currentStrokeSelector,
  setStrokeColor,
} from "../features/currentStroke/currentStrokeSlice";

const ColorsPanel = () => {
  const color = useSelector(currentStrokeSelector).color;
  const dispatch = useAppDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    dispatch(setStrokeColor(color));
  };

  return (
    <div className="w-64 h-96 px-2.5 pt-6 bg-slate-400">
      <input
        className="picker"
        type="color"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ColorsPanel;
