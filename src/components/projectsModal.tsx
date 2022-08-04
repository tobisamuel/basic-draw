import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { hide } from "../features/modal/modalSlice";
import { useAppDispatch } from "../utils/hooks";
import {
  getProjectsList,
  projectsListSelector,
} from "../features/projectsList/projectsListSlice";
import { loadProject } from "../features/strokes/strokesSlice";

const ProjectsModal = () => {
  const dispatch = useAppDispatch();
  const projectsList = useSelector(projectsListSelector);

  useEffect(() => {
    dispatch(getProjectsList());
  }, []);

  const onLoadProject = (projectId: string) => {
    dispatch(loadProject(projectId));
    dispatch(hide());
  };

  return (
    <div className="fixed top-1/4 left-1/3 z-10 h-96 w-[600px] bg-slate-100">
      <div className="flex justify-between px-3 py-5 bg-slate-400">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => dispatch(hide())}
          className="text-2xl text-white"
        >
          <FaTimes />
        </button>
      </div>

      <div className="flex flex-wrap justify-start py-2 overflow-auto">
        {(projectsList || []).map((project) => {
          return (
            <div
              key={project.id}
              className="w-24 h-24 m-5 cursor-pointer text-center"
              onClick={() => onLoadProject(project.id)}
            >
              <img
                src={project.image}
                alt="thumbnail"
                className="w-24 h-24 m-5 cursor-pointer text-center"
              />
              <div className="text-black">{project.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsModal;
