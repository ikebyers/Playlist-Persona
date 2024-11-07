import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  answers: string[] | null; // `null` for short-answer questions
}

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/generate-questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
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

export default HomePage;