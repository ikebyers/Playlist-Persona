import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../src/utils/auth";

interface Question {
  question: string;
  answers: string[] | null; // `null` for short-answer questions
}

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("This where i am");
        const response = await fetch("http://localhost:3001/questions", {});

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

  // const handleSubmit = () => {
  //   const navigate = useNavigate();
  //   // localStorage.setItem("answers", JSON.stringify(Object.values(responses)));
  //   console.log("SUBMITTING")
  //   navigate("/currentPlaylistPage.tsx");
  // };

  // const allAnswered = questions.length > 0 && Object.keys(responses).length === questions.length;

  return (
    <div>
      {loginCheck ? (
        <div>
          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((question, index) => (
              <div
                key={index}
                style={{
                  display: index === currentQuestionIndex ? "block" : "none",
                }}
              >
                <div className="card mx-auto card-margin card-color">
                  <h2 className="mx-auto p-3 body-text-primary">
                    {question.question}
                  </h2>
                  {question.answers && question.answers.length > 0 ? (
                    <ul
                      className="row gx-2"
                      style={{ listStyleType: "none", padding: 0 }}
                    >
                      {question.answers.map(
                        (answer: string, answerIndex: number) => (
                          <li
                            key={answerIndex}
                            className="col-6 col-md-4 d-flex align-items-center mb-1 body-text-primary"
                          >
                            <input
                              type="checkbox"
                              name={`question-${index}`}
                              value={answer}
                              onChange={() => handleResponseChange(index, answer)}
                              checked={responses[index] === answer}
                              className="me-2 checkbox form-check-input"
                            />
                            <label>{answer}</label>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    // Render short-answer text area
                    <input
                      type="text"
                      placeholder="Your answer"
                      onChange={(e) => handleResponseChange(index, e.target.value)}
                      value={responses[index] || ""}
                    />
                  )}
                  {index === questions.length - 1 ? (
                    <Link to="/CurrentPlaylist">
                      <button
                        className="btn-large w-50 p-3 center"
                        // onClick={handleSubmit}
                        disabled={!isNextEnabled()}
                      >
                        Generate Playlist
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="btn-large w-25 p-3 mx-auto center"
                      onClick={handleNextQuestion}
                      disabled={!isNextEnabled()} // Disable button if no valid answer
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h4 className="fst-italic">Loading questions...</h4>
          )}
        </div>
      ) : (
        <div className="mx-auto p-3">
          <h1 className="fw-bold">You are not logged in!</h1>
          <h4 className="fst-italic">Please login to view this page</h4>
        </div>
      )}
    </div>
  );
};

export default HomePage;
