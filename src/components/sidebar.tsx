import { useState } from "react";
import ButtonsPanel from "./buttonsPanel";
import ColorsPanel from "./colorsPanel";
import FilePanel from "./filePanel";
import ModalLayer from "./modalLayer";
import { FaPencilAlt, FaPen } from "react-icons/fa";
import SidebarIcon from "./sidebarIcon";

const Sidebar = () => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="flex flex-col shrink-0 justify-between w-16 h-screen bg-teal-800 px-1 py-3">
      <div className="flex justify-center items-center text-3xl text-white ">
        <FaPen />
      </div>

      <div className="relative flex justify-center items-center text-white">
        <button type="button" onClick={() => setIsShowing(!isShowing)}>
          <SidebarIcon icon={<FaPencilAlt />} text="Pen" />
        </button>

        {isShowing && (
          <div className="absolute top-0 left-16">
            <ColorsPanel />
          </div>
        )}
      </div>

      <FilePanel />
      <ModalLayer />
      <ButtonsPanel />
    </div>
  );
};

export default Sidebar;
