import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Home from './components/Home/Home';
import { MyProvider } from './components/Context';
import Exam from './components/Exam/Exam';
import Chapter from './components/Exam/chapter';
import AddQuestion from './components/Exam/AddQuestion';

const App = () => {
  return (
    <MyProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/chapter" element={<Chapter/>}/>
        <Route path="/addQuestion" element={<AddQuestion/>}/>
      </Routes>
    </Router>
    </MyProvider>
  );
}

export default App;
