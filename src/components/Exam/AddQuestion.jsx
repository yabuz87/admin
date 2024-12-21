import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context';
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; // Correct import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rings } from 'react-loader-spinner';
import './addQuestion.css';

const AddQuestion = () => {
  const { subject, chapter } = useContext(MyContext); // Assume 'chapter' is part of the context
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: '',
    explanation: ''
  });
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject || !chapter) {
      toast.error("Subject and Chapter must be selected", {
        position: "top-center"
      });
      return;
    }

    setLoading(true); // Set loading to true
    try {
      // Ensure even segments by specifying collection and document ID
      const courseDocRef = doc(collection(db, "courses"), subject);
      const chapterDocRef = doc(collection(courseDocRef, "chapters"), chapter);
      const questionsCollectionRef = collection(chapterDocRef, "questions");

      // Generate a unique ID for the new question
      const questionDocRef = doc(questionsCollectionRef);

      // Add a new document with the unique ID
      await setDoc(questionDocRef, {
        ...formData,
        id: questionDocRef.id,
        createdAt: new Date()
      });

      toast.success("Question added successfully!", {
        position: "top-center"
      });

      console.log("Document written with ID: ", questionDocRef.id);
      
      // Fetch updated list of questions
      fetchQuestions();

    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to add question.", {
        position: "top-center"
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const fetchQuestions = async () => {
    if (!subject || !chapter) return;
    try {
      const questionsCollection = collection(db, "courses", subject, "chapters", chapter, "questions");
      const querySnapshot = await getDocs(questionsCollection);
      const questionsList = [];
      querySnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionsList);
      console.log("Fetched Questions: ", questionsList);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    } finally {
      setQuestionsLoading(false); // Set loading to false after fetching questions
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subject, chapter]);

  return (
    <div className="container-lg">
      <ToastContainer />
      {loading && (
        <div className="spinner-container">
          <Rings color="#00BFFF" height={80} width={80} />
        </div>
      )}
      
      <h2 className="text-center">Existing Questions</h2>
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

      <form className="question-form-container" onSubmit={handleSubmit}>
        <div className="question-div">
          <label className="fw-bold">Question:</label>
          <textarea name="question" className="p-2" value={formData.question} onChange={handleChange} />
        </div>
        <div>
          <label>A.</label>
          <input type="text" name="optionA" value={formData.optionA} onChange={handleChange} />
        </div>
        <div>
          <label>B.</label>
          <input type="text" name="optionB" value={formData.optionB} onChange={handleChange} />
        </div>
        <div>
          <label>C.</label>
          <input type="text" name="optionC" value={formData.optionC} onChange={handleChange} />
        </div>
        <div>
          <label>D.</label>
          <input type="text" name="optionD" value={formData.optionD} onChange={handleChange} />
        </div>
        <div>
          <label className="d-block">Answer:</label>
          <input type="text" name="answer" value={formData.answer} onChange={handleChange} />
        </div>
        <div className="explanation-div">
          <label className="fw-bold">Explanation</label>
          <textarea name="explanation" value={formData.explanation} onChange={handleChange} />
        </div>
        <button className="btn btn-secondary px-4" type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
