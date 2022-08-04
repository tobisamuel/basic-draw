import { saveAs } from "file-saver";
import { useCanvas } from "../utils/canvasContext";
import { getCanvasImage } from "../utils/canvasUtils";
import { useAppDispatch } from "../utils/hooks";
import { show } from "../features/modal/modalSlice";
import SidebarIcon from "./sidebarIcon";
import { FaFileDownload, FaFolder, FaSave } from "react-icons/fa";

const FilePanel = () => {
  const canvasRef = useCanvas();
  const dispatch = useAppDispatch();

  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current);
    if (!file) {
      return;
    }
    saveAs(file, "drawing.png");
  };

  const buttons = [
    { text: "Download", icon: <FaFileDownload />, handler: exportToFile },
    {
      text: "Load",
      icon: <FaFolder />,
      handler: () => dispatch(show("PROJECTS_MODAL")),
    },
    {
      text: "Save",
      icon: <FaSave />,
      handler: () => dispatch(show("PROJECTS_SAVE_MODAL")),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mb-3 space-y-8">
      {buttons.map(({ icon, text, handler }) => (
        <button key={text} type="button" onClick={handler}>
          <SidebarIcon icon={icon} text={text} />
        </button>
      ))}
    </div>
  );
};

export default FilePanel;
