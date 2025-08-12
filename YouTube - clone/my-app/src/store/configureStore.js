import { configureStore } from '@reduxjs/toolkit';
import YouTubeReducer from '../feature/youtube/YouTubeSlice';
import YouTubeSlice from '../feature/youtube/YouTubeSlice';
const store = configureStore({
    reducer:{
      YouTubeApp:YouTubeReducer,
    }
});
export default store;