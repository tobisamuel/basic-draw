import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { endStroke } from "../sharedActions";
import { getProject, newProject } from "./api";

type SaveProjectArg = {
  projectName: string;
  thumbnail: string;
};

const initialState: RootState["strokes"] = [];

export const loadProject = createAsyncThunk(
  "LOAD_PROJECT",
  async (projectId: string) => {
    try {
      const { strokes } = await getProject(projectId);
      return strokes;
    } catch (err) {
      console.log(err);
    }
  }
);

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async ({ projectName, thumbnail }: SaveProjectArg, { getState }) => {
    try {
      const response = await newProject(
        projectName,
        (getState() as RootState)?.strokes,
        thumbnail
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
);

const strokesSlice = createSlice({
  name: "strokes",
  initialState,
  reducers: {
    resetCanvas: (state) => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload;
      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke);
      }
    });
    builder.addCase(loadProject.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default strokesSlice.reducer;

export const { resetCanvas } = strokesSlice.actions;

export const strokesSelector = (state: RootState) => state.strokes;

export const strokesLengthSelector = (state: RootState) => state.strokes.length;
