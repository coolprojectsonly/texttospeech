import { createSlice } from "@reduxjs/toolkit";
import { getSpeech } from "./action";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const createReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpeech.pending, (state) => {
      state.status = "Loading";
    });

    builder.addCase(getSpeech.fulfilled, (state, action) => {
      state.status = "succeeeded";
      state.data = action.payload;
    });

    builder.addCase(getSpeech.rejected, (state) => {
      state.status = "failed";
      state.error = "error";
    });
  },
});

export default createReducer;
