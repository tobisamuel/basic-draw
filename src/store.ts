import { configureStore } from "@reduxjs/toolkit";
import currentStrokeSlice from "./features/currentStroke/currentStrokeSlice";
import strokesSlice from "./features/strokes/strokesSlice";
import historyIndexSlice from "./features/historyIndex/historyIndexSlice";
import modalSlice from "./features/modal/modalSlice";
import projectsListSlice from "./features/projectsList/projectsListSlice";

export const store = configureStore({
  reducer: {
    currentStroke: currentStrokeSlice,
    strokes: strokesSlice,
    historyIndex: historyIndexSlice,
    modalVisible: modalSlice,
    projectsList: projectsListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
