import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context'; // Assuming context is used for `subject` and `chapter`
import { db } from '../../../../src/components/firebase/Firebase'; // Firebase Realtime Database instance
import { ref, set, push, onValue } from 'firebase/database'; // Import Realtime Database functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rings } from 'react-loader-spinner';
import './addQuestion.css';

const AddQuestion = () => {
  const { subject, chapter } = useContext(MyContext); // Context values for subject and chapter
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
      // Create a reference for the questions under the selected subject and chapter
      const questionsRef = ref(db, `courses/${subject}/chapters/${chapter}/questions`);
      console.log("Realtime Database path:", `courses/${subject}/chapters/${chapter}/questions`);

      // Push a new question into the Realtime Database
      const newQuestionRef = push(questionsRef);
      console.log("Generated question ID:", newQuestionRef.key);

      // Use `set` to write data to the new reference
      await set(newQuestionRef, {
        ...formData,
        id: newQuestionRef.key, // Use the generated key
        createdAt: new Date().toISOString()
      });

      // Success notification
      toast.success("Question added successfully!", {
        position: "top-center"
      });

      // Fetch updated list of questions
      fetchQuestions();

    } catch (e) {
      console.error("Error adding question:", e);
      toast.error("Failed to add question. Please check the console for details.", {
        position: "top-center"
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const fetchQuestions = async () => {
    if (!subject || !chapter) return;
    try {
      const questionsRef = ref(db, `courses/${subject}/chapters/${chapter}/questions`);
      onValue(questionsRef, (snapshot) => {
        const data = snapshot.val();
        const questionsList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        setQuestions(questionsList);
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
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
              <div className="option"><strong>Option A:</strong> {question.optionA}</div>
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
