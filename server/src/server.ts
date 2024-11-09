const forceDatabaseRefresh = false;

import express, { Request, Response } from "express";
import routes from "./routes/index.js";
import { generatePlaylist, generateQuestions } from "./services/gptServices.js";
import { searchSong } from "./services/youtubeServices.js";
import cors from "cors";
import sequelize from "./config/connection.js";
// const cors = require('cors');
// import app from "./app.js";

const app = express();
const port = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});


app.use(cors({ origin: "http://localhost:3000" }));

// // Serves static files in the entire client's dist folder
// app.use(express.static('../client/dist'));

// app.use(express.json());
// app.use(routes);

app.post("/playlist", async (req: Request, res: Response) => {
  try {
    const { questions, answers } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ error: "titles and artists must be arrays" });
    } else if (questions.length !== answers.length) {
      return res
        .status(400)
        .json({ error: "titles and artists arrays must have the same length" });
    }

    const playlist = await generatePlaylist(questions, answers);
    // console.log("returned from 2nd openaiAPI call", playlist)

    const playlistWithUrls = await Promise.all(
      playlist.map(async (song) => {
        // console.log("song structure:", song);
        // console.log("song:", song.songTitle, "artist:", song.artistName);
        const url = await searchSong(song.songTitle, song.artistName);
        // console.log("full song structure", song.songTitle, song.artistName, url);
        return { ...song, url: url };
      })
    );
    
    return res.json(playlistWithUrls);
  } catch (error) {
    console.error("error generating playlist", error);
    return res.status(500).json({ error: "error while generating playlist" });
  }
});

app.get("/questions", async (_req: Request, res: Response) => {
  const questions = await generateQuestions();
  res.json({ questions });
});

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

// const app = express();
// const port = 3000;

// // Serves static files in the entire client's dist folder
// app.use(express.static('../client/dist'));

// app.use(express.json());
// app.use(routes);

// app.get('/api/questions', async (_req: Request, res: Response) => {
//     const questions = await generateQuestions();
//     res.json({ questions });
// })

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function askQuestions(questions: string[]): Promise<string[]> {
//   return new Promise<string[]>((resolve, _reject) => {
//     const responses: string[] = [];
//     let index = 0;

//     function askNextQuestion() {
//       if (index < questions.length) {
//         rl.question(`${questions[index]}\n> `, (answer) => {
//           responses.push(answer);
//           index++;
//           askNextQuestion();
//         });
//       } else {
//         resolve(responses);
//         rl.close();
//       }
//     }
//     askNextQuestion();
//   });
// }

// async function generateSongs(userResponses: string[]) {
//   try {
//     const prompt = `Based on the following user responses, curate 20 song recommendations
//         1. Music genre preferences: ${userResponses[0]} and ${userResponses[1]}
//         2. Mood today: ${userResponses[2]} and ${userResponses[3]}
//         3. Personality-based: ${userResponses[4]} and ${userResponses[5]}
//         `;
//   } catch {}
// }

// const { google } = require("googleapis");
// const youtube = google.youtube({
//   version: "v3",
//   auth: process.env.YOUTUBE_API_KEY,
// });
// const youtubeUrl = process.env.YOUTUBE_API_URL;

// const searchSong = async (title: string, artist: string) => {
//   try {
//     // Create a search query with title and artist
//     const query = `${title} ${artist}`;

//     // Make the API request to search for videos
//     const res = await youtube.search.list({
//       part: "snippet",
//       q: query,
//       type: "video",
//       maxResults: 1, // We are only interested in the first result
//     });

//     // Get the video URL
//     const video = res.data.items[0];
//     const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

//     console.log(videoUrl);
//     return videoUrl;
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// };

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
