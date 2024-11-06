import OpenAI from "openai";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import readline from "readline";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// generate prompt questions
async function generateQuestions(): Promise<string[] | undefined> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a music guru." },
        {
          role: "user",
          content: `generate 6 questions formatted as:
                    Q1: [Question 1]
                    Q2: [Question 2]
                    Q3: [Question 3]
                    Q4: [Question 4]
                    Q5: [Question 5]
                    Q6: [Question 6] --

                    2 of the questions should be multiple choice (with 15 choices) that serve to understand a user's music genre preferences (one of these questions should be about genre preference explicitly such as genre titles, another one should be synonymous with genre but in less technical terms such as describing mood, feel, tempo, instruments used, etc.)

                    2 of the questions should be multiple choice with 10 choices that define the user's mood for the day (one being what their mood of the day is, one being what mood of music they'd prefer to listen to)

                    2 of the questions should require short form answers, nothing more than a sentence or two from the user. One of the short form questions should be an unconventional personality-based question that feels like it may have never been asked before, the other short form question should ask the user in a creative way to summarize an event that happened in their daily life or ask them to describe their day in a few words. These should help provide unique key word responses providing more in depth understanding of the users mood.

                    Formatting Rules:
                    In the short form questions, only provide the questions--don't put any 'answer:' guide
                    In your response, don't provide anything else other than the questions and answer options.
                    When formatting the questions, provide the answer options for the multiple choice as A1, A2, etc. without bullet points.`,
        },
      ],
    });

    console.log(completion.choices[0].message?.content);
    if (completion.choices[0].message.content) {
      return completion.choices[0].message.content
        .split("\n")
        .filter((q) => q.trim() !== "");
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}

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

const title = "Houston";
const artist = "Jean Dawson";
searchSong(title, artist);
