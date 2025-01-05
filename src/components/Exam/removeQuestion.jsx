import React from 'react'
import { MyContext } from '../context'
import { Rings } from 'react-loader-spinner';
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; // Correct import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const removeQuestion = () => {
    const { subject, chapter } = useContext(MyContext);
    const [questionsLoading, setQuestionsLoading] = useState(true);
  return (
    <div>
       <h2>{subject} {chapter}</h2>
            <h4 className="text-center">Existing Questions</h4>
            {questionsLoading ? (
              <div className="spinner-container">
                <Rings color="#00BFFF" height={80} width={80} />
              </div>
            ) : (
              <ol>
                {questions.map((question) => (
                  <li key={question.id}>
                    <div className="option"><strong>Question:</strong> {question.question}</div>
                    <div className="option" ><strong>Option A:</strong> {question.optionA}</div>
                    <div className="option"><strong>Option B:</strong> {question.optionB}</div>
                    <div className="option"><strong>Option C:</strong> {question.optionC}</div>
                    <div className="option"><strong>Option D:</strong> {question.optionD}</div>
                    <div className="Answer-div"><strong>Answer:</strong> {question.answer}</div>
                    <div className="explanation-div"><strong>Explanation:</strong> {question.explanation}</div>
                  </li>
                ))}
              </ol>
            )}
    </div>
  )
}

export default removeQuestion
