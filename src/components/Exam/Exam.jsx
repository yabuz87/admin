import React, { useContext } from 'react';
import { MyContext } from '../context/'; // Ensure correct path
import { useNavigate } from 'react-router-dom';
import './exam.css';

const Exam = () => {
  const { action, setAction, subject, setSubject } = useContext(MyContext); // Ensure correct destructuring
  const navigate = useNavigate();

  const handleSubject = (e) => {
    setSubject(e);

    navigate('/chapter');
  };

  return (
    <div>
      <h1 className="text-center">Courses</h1>
      <p className="h2 ms-5 ps-4">{action}</p>
      <div className="home-container container-lg">
        <div className="option-container" onClick={() => handleSubject("Math For Natural")}>
          <i className="bi bi-infinity"></i>
          <div>Math For Natural</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("Math For Social Science")}>
          <i className="bi bi-calculator-fill"></i>
          <div>Math For Social Science</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("Emerging Technology")}>
          <i className="bi bi-pc"></i>
          <div>Emerging Technology</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("Global Trends")}>
          <i className="bi bi-globe-central-south-asia"></i>
          <div>Global Trend</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("English Skill I")}>
          <i className="bi bi-megaphone"></i>
          <div>English Skill I</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("English Skill II")}>
          <i className="bi bi-megaphone-fill"></i>
          <div>English Skill II</div>
        </div>
        <div className="option-container" onClick={() => handleSubject("Physics")}>
          <i className="bi bi-gear-wide-connected"></i>
          <div>Physics</div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
