import express, { Request, Response } from 'express';
import routes from "./routes/index.js";
import generateQuestions from "./services/gptServices.js";
import sequelize from './config/connection.js';


const app = express();
const port = 3000;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

app.get('/api/questions', async (_req: Request, res: Response) => {
    const questions = await generateQuestions();
    res.json({ questions });
})

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

async function generateSongs(userResponses: string[]) {
  try {
    const prompt = `Based on the following user responses, curate 20 song recommendations
        1. Music genre preferences: ${userResponses[0]} and ${userResponses[1]}
        2. Mood today: ${userResponses[2]} and ${userResponses[3]}
        3. Personality-based: ${userResponses[4]} and ${userResponses[5]}
        `;
  } catch {}
}

const { google } = require("googleapis");
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});
const youtubeUrl = process.env.YOUTUBE_API_URL;

const searchSong = async (title: string, artist: string) => {
  try {
    // Create a search query with title and artist
    const query = `${title} ${artist}`;

    // Make the API request to search for videos
    const res = await youtube.search.list({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 1, // We are only interested in the first result
    });

    // Get the video URL
    const video = res.data.items[0];
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

    console.log(videoUrl);
    return videoUrl;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

async function run() {
  const questions = await generateQuestions();
    // if (questions) {
    //   console.log("answer the following:");
    //   const userResponses = await askQuestions(questions);
    //   userResponses.forEach((response, index) => {
    //     console.log(`Q${index + 1}: ${questions[index]}`);
    //     console.log(`A${index + 1}: ${response}`);
    //   });
    // } else {
    //   console.log("nothing");
    // }
}

// run();

// const title = "Houston";
// const artist = "Jean Dawson";
// searchSong(title, artist);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
