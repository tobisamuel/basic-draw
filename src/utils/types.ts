import { ModalState } from "../features/modal/modalSlice";

export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
  modalVisible: ModalState;
  projectsList: {
    error?: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    projects: Project[];
  };
};

export type Stroke = {
  points: Point[];
  color: string;
};

export type Point = {
  x: number;
  y: number;
};

export type Project = {
  id: string;
  name: string;
  image: string;
};
