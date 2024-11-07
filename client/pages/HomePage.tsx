import { useEffect, useState } from "react";

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
        console.log("This where i am");
        const response = await fetch("http://localhost:3001/api/questions");

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();

        if (Array.isArray(data.questions)) {
          const questionsText = data.questions.map((q: Question) => q.question);
          localStorage.setItem("questions", JSON.stringify(questionsText));
          // localStorage.setItem('answers', JSON.stringify(data.answers));
          setQuestions(data.questions);
          // data.questions.forEach(element => {
          //   localStorage.setItem('questions', JSON.stringify(element));
          // });
        } else {
          console.log("not an array");
        }
        // setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle response change
  const handleResponseChange = (questionIndex: number, answer: string) => {
    // setResponses((prevResponses) => ({
    //   ...prevResponses,
    //   [questionIndex]: answer,
    // }));
    setResponses((prevResponses) => {
      const updatedResponses = {
        ...prevResponses,
        [questionIndex]: answer,
      };

      const responseText = Object.values(updatedResponses);
      localStorage.setItem("answers", JSON.stringify(responseText));

      return updatedResponses;
    });
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

  // const allAnswered = questions.length > 0 && Object.keys(responses).length === questions.length;

  return (
    <div>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((question, index) => (
          <div
            key={index}
            style={{
              display: index === currentQuestionIndex ? "block" : "none",
            }}
          >
            <h2>{question.question}</h2>
            {question.answers && question.answers.length > 0 ? (
              // Render multiple-choice options
              <div>
                {question.answers.map((answer: string, answerIndex: number) => (
                  <label key={answerIndex}>
                    <input
                      type="checkbox"
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
              <input
                type="text"
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
        ))
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default HomePage;
