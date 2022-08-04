import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Point } from "../../utils/types";
import { endStroke } from "../sharedActions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

const currentStrokeSlice = createSlice({
  name: "currentStroke",
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload];
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    // reset points array when drawing stops
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export default currentStrokeSlice.reducer;

export const { beginStroke, updateStroke, setStrokeColor } =
  currentStrokeSlice.actions;

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
