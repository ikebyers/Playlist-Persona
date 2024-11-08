import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the Question type above the function
interface Question {
  question: string;
  answers: string[];
}

// Generate prompt questions
export async function generateQuestions(): Promise<Question[]> {
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

                    The first question should be multiple choice (with 15 choices, use one word genre-name) that serve to understand a user's music “genre” preferences (this question should be about genre preference explicitly such as genre titles).

                    The second question should be multiple choice (with 15 choices, use one word options) that serve to understand a user's music “style” preferences (this question should be synonymous with genre but in less technical terms such as describing mood, feel, tempo, instruments used, etc.).

                    The third question should be multiple choice with 10 choices (use one word adjectives) that define the user's “mood for the day”.

                    The fourth question should be multiple choice with 10 choices (use one word adjectives) that define the user's “preferred mood,” in case it differentiates from their current mood.

                    The fifth question should require a short form answer, nothing more than a few words from the user. The short form question should be an unconventional "personality" based question that feels like it may have never been asked before. This should help provide unique key word responses providing more in depth understanding of the users mood.

                    The sixth and final question (multiple choice: 4 options -- Very popular, popular but not mainstream, undiscovered gems, underground) must act as a "filter" for the user to define the type of artist they want to listen to based on popularity and view count of songs.

                    Formatting Rules:
                    - In the short form questions, only provide the questions--don't put any 'answer:' guides.
                    - In your response, don't provide anything else other than the questions and answer options.
                    - When formatting the questions, provide the answer options for the multiple choice as A1, A2, etc. without bullet points.`,
        },
      ],
    });

    const questionsData = completion.choices[0].message?.content;

    if (questionsData) {
      const questionArray = questionsData
        .split("\n")
        .filter((q) => q.trim() !== "");
      const formattedQuestions: Question[] = [];
      let currentQuestion: string | null = null;
      let currentAnswers: string[] | null = null;

      questionArray.forEach((line) => {
        if (line.startsWith("Q")) {
          if (currentQuestion) {
            formattedQuestions.push({
              question: currentQuestion,
              answers: currentAnswers || [],
            });
          }
          currentQuestion = line.replace(/^Q\d+:\s*/, "").trim();
          currentAnswers = [];
        } else if (line.startsWith("A")) {
          const answerText = line.split(":")[1]?.trim();
          if (answerText) {
            currentAnswers?.push(answerText);
          }
        }
      });

      if (currentQuestion) {
        formattedQuestions.push({
          question: currentQuestion,
          answers: currentAnswers || [],
        });
      }

      return formattedQuestions;
    }
    // Add a return statement if questionsData is undefined
    return [];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}

export async function generatePlaylist(
  questions: string[],
  answers: string[]
): Promise<{ songTitle: string; artistName: string }[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a music guru." },
        {
          role: "user",
          content: `"The first question should be multiple choice (with 15 choices, use one word genre-name) that serve to understand a user's music “genre” preferences (this question should be about genre preference explicitly such as genre titles).

          The second question should be multiple choice (with 15 choices, use one word options) that serve to understand a user's music “style” preferences (this question should be synonymous with genre but in less technical terms such as describing mood, feel, tempo, instruments used, etc.).

          The third question should be multiple choice with 10 choices (use one word adjectives) that define the user's “mood for the day”.

          The fourth question should be multiple choice with 10 choices (use one word adjectives) that define the user's “preferred mood,” in case it differentiates from their current mood.

          The fifth question should require a short form answer, nothing more than a few words from the user. The short form question should be an unconventional "personality" based question that feels like it may have never been asked before. This should help provide unique key word responses providing more in depth understanding of the users mood.

          The sixth and final question (multiple choice: 4 options -- Very popular, popular but not mainstream, undiscovered gems, underground) must act as a "filter" for the user to define the type of artist they want to listen to based on popularity and view count of songs.


          Q1: ${questions[0]}
          Q2: ${questions[1]}
          Q3: ${questions[2]}
          Q4: ${questions[3]}
          Q5: ${questions[4]}
          Q6: ${questions[5]}

          A1: ${answers[0]}
          A2: ${answers[1]}
          A3: ${answers[2]}
          A4: ${answers[3]}
          A5: ${answers[4]}
          A6: ${answers[5]}

          The above prompt is an initial API call to open AI, followed by the questions generated and the user input responses to those questions.

          Based on the questions and user responses, please generate a 10 song playlist utilizing the user's responses to formulate a query that meets the criteria. Provide song title and artist name.

          Based on the public YouTube "views" metric, and the most up to date information you have, implement the users input from question six and adjust the search parameters as follows:
            "Very popular" - minimum: 2,000,000 views;
            "Popular but not mainstream" - minimum: 500,000 views, maximum: 2,000,000 views;
            "Undiscovered gems" - minimum: 100,000 views, maximum: 500,000 views;
            "Underground" - maximum: 100,000 views

          When making this playlist, don't choose the first 10 songs that meet the users input and the defined parameters, do some creative ideation on providing different artists. None of the songs on this playlist should be from the same artists.

          Please don't respond with ANY other text than the song name and the artist name in JSON format as follows: [
          {"songTitle": "song title", "artistName": "name"},
           {"songTitle": "song title", "artistName": "name"},
            {etc...}
            ]`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    // console.log(content);
    if (content) {
      const playlist = JSON.parse(content);
      return playlist;
    } else {
      console.log("Whadufuck");
      return [];
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}
