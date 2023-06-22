import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Quiz.css'
interface Quiz {
  id: number;
  questions: string[];
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const quizzesLuck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleLuckyClick = () => {
    const randomQuizId = quizzesLuck[Math.floor(Math.random() * quizzesLuck.length)];
    
    window.location.href = `/quiz/${randomQuizId}`;
  };
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10');
        const quizData = response.data.results.map((quiz: any, index: number) => ({
          id: index,
          questions: [quiz.question, ...quiz.incorrect_answers],
        }));
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className='quiz_list'>
       
      <h1 className='quiz_title'>Quiz List</h1>
       <button className='luck' onClick={handleLuckyClick}>I'm lucky</button>
      <ul className='quizzes'>
        {quizzes.map((quiz) => (
          <li className='quiz' key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>Quiz {quiz.id + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
