import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// interface Question {
//   question: string;
//   answers: string[];
// }

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
  
      // console.log(completion.choices[0].message?.content);
      const questions = completion.choices[0].message?.content;
      
      if (questions) {
        const questionArray = questions.split("\n").filter(q => q.trim() !== "");
        const formattedQuestions: any[] = [];
        let currentQuestion: string | null = null;
        let currentAnswers: string[] = [];
  
        questionArray.forEach(line => {
          if (line.startsWith('Q')) {
            if (currentQuestion) {
              formattedQuestions.push({ question: currentQuestion, answers: currentAnswers })
            }
            currentQuestion = line.replace(/^Q\d+:\s*/, "").trim();
            currentAnswers = [];
          } else if (line.startsWith('A')) {
            currentAnswers.push(line.split(":")[1].trim());
          }
        });
  
        if (currentQuestion) {
          formattedQuestions.push({ question: currentQuestion, answers: currentAnswers || [],
          });
        }
  
        // console.log(formattedQuestions);
        return formattedQuestions;
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  }

  export default generateQuestions;