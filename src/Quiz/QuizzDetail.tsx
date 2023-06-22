import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface QuizParams {
  id: string;
}

interface QuizQuestion {
  question: string;
  answers: string[];
}

const QuizDetail: React.FC = () => {
  const { id } = useParams();
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

  const fetchQuizQuestion = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=1`);
      const quizData = response.data.results[0];
      const { question, incorrect_answers } = quizData;
      const answers = [...incorrect_answers, quizData.correct_answer];
      setQuizQuestion({
        question,
        answers,
      });
    } catch (error) {
      console.error('Error fetching quiz question:', error);
    }
  };

  useEffect(() => {
    fetchQuizQuestion();
  }, []);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    const isAnswerCorrect = selectedAnswer === quizQuestion?.answers[quizQuestion?.answers.length - 1];
    if (isAnswerCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    fetchQuizQuestion();
  };

  const isQuizFinished = currentQuestionIndex > 10;

  return (
    <div className='quiz_question'>
      <h2>Quiz {id}</h2>
      {isQuizFinished ? (
        <div>
          <h3>Quiz Finished!</h3>
          <p>Correct Answers: {correctAnswersCount}</p>
         
        </div>
      ) : (
        <>
          <p className='question_num'>Question {currentQuestionIndex}</p>
          {quizQuestion ? (
            <>
              <p>{quizQuestion.question}</p>
              {quizQuestion.answers.map((answer, index) => (
                <div  key={index}>
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name="answer"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => handleAnswerSelection(answer)}
                  />
                  <label htmlFor={`answer${index}`}>{answer}</label>
                </div>
              ))}
              {showResult && (
                <>
                  {isCorrect ? <p>Correct answer!</p> : <p>Wrong answer!</p>}
                  <button onClick={handleNextQuestion}>Next Question</button>
                  
                </>
              )}
              {!showResult && (
                <button className='button' disabled={selectedAnswer === null} onClick={handleSubmitAnswer}>
                  Submit Answer
                </button>
              )}
            </>
          ) : (
            <p>Loading question...</p>
          )}
          <Link className='button' to='/'>Cancel</Link>
        </>
        
      )}
    </div>
  );
};

export default QuizDetail;
