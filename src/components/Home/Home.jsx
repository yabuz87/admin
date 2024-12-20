// src/components/Home/Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const { action, setAction } = useContext(MyContext);

  const nextHandler = (e) => {
    setAction(e);
    navigate('/exam');
  };

  return (
    <div>
      <h1 className="text-center mb-2">Actions</h1>
      <div className="home-container container-lg">
        <div className="option-container" onClick={() => nextHandler('Add Course')}>
          <i className="bi bi-plus"></i>
          <div>Add Course</div>
        </div>
        <div className="option-container" onClick={() => nextHandler('Remove Course')}>
          <i className="bi bi-trash-fill"></i>
          <div>Remove Course</div>
        </div>
        <div className="option-container" onClick={() => nextHandler('Edit Course')}>
          <i className="bi bi-gear-fill"></i>
          <div>Edit Course</div>
        </div>
        <div className="option-container" onClick={() => nextHandler('Add Exam')}>
          <i className="bi bi-plus"></i>
          <div>Add Exam</div>
        </div>
        <div className="option-container" onClick={() => nextHandler('Remove Exam')}>
          <i className="bi bi-trash"></i>
          <div>Remove Exam</div>
        </div>
        <div className="option-container" onClick={() => nextHandler('Edit Exam')}>
          <i className="bi bi-gear"></i>
          <div>Edit Exam</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
