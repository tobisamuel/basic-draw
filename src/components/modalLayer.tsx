import { useSelector } from "react-redux";
import { modalNameSelector } from "../features/modal/modalSlice";
import ProjectsModal from "./projectsModal";
import SaveModal from "./saveModal";

const ModalLayer = () => {
  const modalName = useSelector(modalNameSelector);
  switch (modalName) {
    case "PROJECTS_MODAL": {
      return <ProjectsModal />;
    }
    case "PROJECTS_SAVE_MODAL": {
      return <SaveModal />;
    }
    default:
      return null;
  }
};

export default ModalLayer;
