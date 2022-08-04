import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { fetchProjectsList } from "./api";

export const getProjectsList = createAsyncThunk(
  "GET_PROJECTS_LIST",
  async () => {
    const response = await fetchProjectsList();
    return response;
  }
);

const initialState: RootState["projectsList"] = {
  error: null,
  status: "idle",
  projects: [],
};

const projectsListSlice = createSlice({
  name: "projectsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.error = null;
      state.status = "succeeded";
      state.projects = action.payload;
    });
    builder.addCase(getProjectsList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default projectsListSlice.reducer;

export const projectsListSelector = (state: RootState) =>
  state.projectsList.projects;

export const projectsListStatusSelector = (state: RootState) =>
  state.projectsList.status;

export const projectsListErrorSelector = (state: RootState) =>
  state.projectsList.error;
