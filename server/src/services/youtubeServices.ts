import { google, youtube_v3 } from "googleapis";
// const { google } = require("googleapis");

const apiKey = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
  version: "v3",
  auth: apiKey as string,
}) as youtube_v3.Youtube;

// const youtube = google.youtube("v3") as youtube_v3.Youtube;

export const searchSong = async (songTitle: string, artistName: string): Promise<string | null> => {
    try {
      const query = `${songTitle} ${artistName}`;
    //   console.log("Search query" ,query);
  
      // make the API request to search for videos
      const res = await youtube.search.list({
        part: ["snippet"], // Make sure part is an array of strings
        q: query,
        type: ["video"], // Make type an array of strings as well
        maxResults: 1,
      });
  
      const items = res.data.items;
    if (items && items.length > 0) {
      const video = items[0];
      const videoUrl = `${video.id?.videoId}`;
      console.log(videoUrl);
      return videoUrl;
    } else {
      console.log("No video found");
      return null;
    }
    } catch (error) {
      console.error("Error fetching video:", error);
      return null;
    }
  };