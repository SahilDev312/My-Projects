// store/slices/YouTubeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getHomeVideo } from "../../store/reducer/getHomeVideo";

const youTubeSlice = createSlice({
  name: "YouTubeApp",
  initialState: {
    videos: [],
    nextPageToken: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHomeVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload.items;
        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(getHomeVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default youTubeSlice.reducer;
