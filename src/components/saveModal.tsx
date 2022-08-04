import { FaTimes } from "react-icons/fa";
import { useState, ChangeEvent } from "react";
import { useAppDispatch } from "../utils/hooks";
import { hide } from "../features/modal/modalSlice";
import { saveProject } from "../features/strokes/strokesSlice";
import { useCanvas } from "../utils/canvasContext";
import { getCanvasImage } from "../utils/canvasUtils";
import { getBase64Thumbnail } from "../utils/scaler";

const SaveModal = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useCanvas();
  const [projectName, setProjectName] = useState("");

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const onProjectSave = async () => {
    const file = await getCanvasImage(canvasRef.current);
    if (!file) {
      return;
    }
    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 });
    dispatch(saveProject({ projectName, thumbnail }));
    setProjectName("");
    dispatch(hide());
  };

  return (
    <div className="fixed top-1/4 left-1/3 z-10 w-96 h-96 bg-slate-100">
      <div className="flex justify-center px-3 py-5 bg-slate-400">
        <h1 className="text-2xl font-bold">Save</h1>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        <label htmlFor="projectName">Project Name:</label>
        <input id="projectName" type="text" onChange={onProjectNameChange} />
      </div>

      <div className="flex justify-center mt-28 gap-4">
        <button onClick={onProjectSave} className="px-5 py-3 bg-slate-400">
          Save
        </button>
        <button
          onClick={() => dispatch(hide())}
          className="px-5 py-3 bg-slate-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveModal;
