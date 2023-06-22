import React from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import QuizList from './Quiz/QuizzList';
import QuizDetail from './Quiz/QuizzDetail';
import Navbar from './Navbar/Navbar';
import './App.css'

const App: React.FC = () => {
  return (
    
      <>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
        </Routes>
      </>
    
  );
};

export default App;
