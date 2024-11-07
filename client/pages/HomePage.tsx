import React, { useEffect, useState } from "react";
import generateQuestions from "./../../server/src/services/gptServices";

interface Question {
  question: string;
  answers: string[] | null; // `null` for short-answer questions
}

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  // Fetch questions from the API
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const generatedQuestions = await generateQuestions();
  //     if (generatedQuestions) {
  //       const questions = [];
  //       generatedQuestions.forEach(item => {
  //         questions.push(item.question)
  //       })
  //       setQuestions(generatedQuestions);
  //     }
  //   };
  //   fetchQuestions();
  // }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const generatedQuestions = await generateQuestions();
      if (generatedQuestions) {
        setQuestions(generatedQuestions); // Directly set as Question[]
      }
    };
    fetchQuestions();
  }, []);

  // Handle response change
  const handleResponseChange = (questionIndex: number, answer: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: answer,
    }));
  };

  // Handle navigation to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Check if the "Next" button should be enabled
  const isNextEnabled = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const response = responses[currentQuestionIndex];

    if (currentQuestion.answers) {
      // makes sure an answer is selected for multiple-choice questions
      return response !== undefined;
    } else {
      // makes sure user has text input for short-answer questions
      return response && response.trim() !== "";
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{ display: index === currentQuestionIndex ? "block" : "none" }}
        >
          <h2>{question.question}</h2>
          {question.answers ? (
            // Render multiple-choice options
            <div>
              {question.answers.map((answer: string, answerIndex: number) => (
                <label key={answerIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={answer}
                    onChange={() => handleResponseChange(index, answer)}
                    checked={responses[index] === answer}
                  />
                  {answer}
                </label>
              ))}
            </div>
          ) : (
            // Render short-answer text area
            <textarea
              placeholder="Your answer"
              onChange={(e) => handleResponseChange(index, e.target.value)}
              value={responses[index] || ""}
            />
          )}
          <button
            onClick={handleNextQuestion}
            disabled={!isNextEnabled()} // Disable button if no valid answer
          >
            Next
          </button>
        </div>
      ))}
    </div>
  );
};



// const HomePage = () => {
//     return (
//       <div>
//         <div>
//           <h2>Question 1</h2>
//         </div>
//       </div>
//     );
//   };

export default HomePage;