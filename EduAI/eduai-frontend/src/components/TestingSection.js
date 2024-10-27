import React, { useState, useEffect } from 'react';
import './TestingSection.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Sample data for questions
const sampleQuestions = [
  {
    question: "What is the main theme of the video \"A World Without... Walls\"?",
    options: ["The importance of architecture in society", " Imagining a world with no barriers, both physical and metaphorical", "How to construct different types of walls", "The evolution of wall designs through history"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the purpose of the video clip according to the summary?",
    options: ["To provide a detailed history of wall construction", "To promote an architectural show", "To encourage viewers to think about life without walls", "To discuss the environmental impact of building materials"],
    correctAnswerIndex: 2,
  },
  {
    question: "What type of walls is the video asking viewers to imagine living without?",
    options: ["Only literal, physical walls", "Only metaphorical, emotional walls", "Both literal and metaphorical walls", "Walls in ancient buildings"],
    correctAnswerIndex: 3,
  },
  {
    question: "What additional information is provided at the end of the video clip?",
    options: ["Contact information for inquiries", "A list of architectural techniques", "A preview of the next episode", "Instructions for building a house without walls"],
    correctAnswerIndex: 2,
  },
  {
    question: "What kind of content does the video belong to?",
    options: ["A documentary series about construction techniques", "A science fiction movie", "A series that explores different hypothetical scenarios", "A tutorial on home improvement"],
    correctAnswerIndex: 1,
  },
];

const TestingSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // State to lock answer choices
  const [isCardVisible, setIsCardVisible] = useState(true); // State for card visibility
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti visibility
  const [confettiOpacity, setConfettiOpacity] = useState(1); // State for fading confetti
  const { width, height } = useWindowSize(); // Get window dimensions for confetti

  useEffect(() => {
    if (selectedAnswer !== null) {
      // Show feedback with a slight delay to allow CSS transition
      setTimeout(() => {
        setShowFeedback(true);
      }, 50);
    }
  }, [selectedAnswer]);

  useEffect(() => {
    if (quizCompleted) {
      setShowConfetti(true);

      // Start fading out the confetti after 2 seconds
      const fadeOutTimer = setTimeout(() => {
        const fadeInterval = setInterval(() => {
          setConfettiOpacity((prevOpacity) => {
            if (prevOpacity > 0) {
              return prevOpacity - 0.1; // Gradually reduce opacity
            } else {
              clearInterval(fadeInterval); // Stop when opacity is 0
              setShowConfetti(false); // Hide confetti after fading
              setConfettiOpacity(1); // Reset opacity for future use
              return 0;
            }
          });
        }, 100);
      }, 2000);

      return () => {
        clearTimeout(fadeOutTimer); // Cleanup timer on component unmount
      };
    }
  }, [quizCompleted]);

  const handleAnswerClick = (index) => {
    if (isLocked) return; // Prevent further selection if already locked
    const correctIndex = sampleQuestions[currentQuestionIndex].correctAnswerIndex;
    setSelectedAnswer(index);
    setIsLocked(true); // Lock answer choices after the first selection

    if (index === correctIndex) {
      setIsCorrect(true);
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
      setFeedback("Incorrect!");
    }
  };

  const handleContinue = () => {
    // Hide feedback first, then proceed to next question
    setShowFeedback(false);
    setIsCardVisible(false); // Trigger fade-out for the current card

    setTimeout(() => {
      if (currentQuestionIndex < sampleQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setFeedback("");
        setIsLocked(false); // Unlock for the next question
        setIsCardVisible(true); // Trigger fade-in for the new card
      } else {
        setQuizCompleted(true);
      }
    }, 500); // Delay to allow fade-out before resetting the state
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback("");
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
    setIsLocked(false); // Unlock for a fresh start
    setIsCardVisible(true); // Ensure card is visible on restart
  };

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const scorePercentage = Math.round((score / sampleQuestions.length) * 100);

  return (
    <div className="testing-section-container">
      {/* Confetti when the quiz is completed */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          opacity={confettiOpacity} // Control opacity for fading effect
        />
      )}

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      {!quizCompleted ? (
        <div className={`main-content ${isCardVisible ? 'fade-slide-in' : 'fade-slide-out'}`}>
          <div className="quiz-card">
            <div className="multiple-choice-question">
              <h3>{currentQuestion.question}</h3>
              {currentQuestion.options.map((choice, index) => (
                <div
                  key={index}
                  className={`answer-choice ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  } ${isLocked ? 'disabled' : ''}`} // Add 'disabled' class when locked
                  onClick={() => handleAnswerClick(index)}
                >
                  {choice}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Display final score when the quiz is completed
        <div className="final-score-section">
          <div className="star-animation">
            <svg
              className="star-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <h3>Quiz Completed!</h3>
          <p>Your score: {scorePercentage}%</p>
          <div style={{ marginBottom: '50px' }}></div> {/* Add space before the button */}
          <button className="continue-button" onClick={handleRestart}>
            New Quiz
          </button>
        </div>
      )}

      {/* Feedback Section */}
      {selectedAnswer !== null && !quizCompleted && (
        <div
          className={`feedback-section ${showFeedback ? 'show' : ''} ${
            isCorrect ? 'correct' : 'incorrect'
          }`}
        >
          <div className="feedback-icon">
            {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
          <div className="feedback-content">
            <div className="feedback-message">
              {feedback}
            </div>
            <div className="feedback-detail">
              {isCorrect
                ? "Well done!"
                : `The correct answer is "${currentQuestion.options[currentQuestion.correctAnswerIndex]}".`}
            </div>
          </div>
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default TestingSection;
