import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ParseData } from "../../utils/ParseData";

const API_KEY = "AIzaSyBSqtFuWfV6Wk0klteYJbq-Xm5IP0IMuds"; // Replace with your actual API key

export const getHomeVideo = createAsyncThunk(
  "YouTube/App/HomeVideo",
  async ({ query, isNext, regionCode = "IN", relevanceLanguage = "en" }, { getState }) => {
    const {
      YouTubeApp: { NextpageToken: nextPageTokenFromState },
    } = getState();
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 500,
            type: "video",
            key: API_KEY,
            pageToken: isNext ? nextPageTokenFromState : "",
            q: query || "react tutorials",
            regionCode: regionCode,
            relevanceLanguage: relevanceLanguage,
            safeSearch: "moderate",
            videoDuration: "any",
            videoDefinition: "high",
            order: "viewCount",
          },
        }
      );

      const {
        data: { items, nextPageToken },
      } = response;
     
      console.log(items);
      // Process the items with ParseData
      const processedItems = await ParseData(items);

      // Log processed items for debugging
      console.log(processedItems);

      return { items: processedItems, nextPageToken };
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      throw error; // Throw error to be handled in the reducer or component
    }
  }
);
