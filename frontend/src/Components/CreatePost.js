import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/CreatePost.css'; 

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    filename: "",
    content: "",
    questions: [], // Store questions here
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false); // Toggle question form
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    type: "multiple-choice", // Default to multiple choice
    options: [],
    answer: "", // Add answer field for "fill-in-the-blank"
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] });
  };

  const handleFileUpload = (e) => {
    setNewQuestion({ ...newQuestion, image: e.target.files[0] });
  };

  const handleAddQuestion = () => {
    setFormData({ ...formData, questions: [...formData.questions, newQuestion] });
    setNewQuestion({ title: "", type: "multiple-choice", options: [], answer: "", image: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    const newPost = { ...formData, userId };

    axios
      .post("http://localhost:4000/posts", newPost)
      .then(() => {
        alert("Post created successfully!");
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  const toggleQuestionForm = () => {
    setShowQuestionForm((prev) => !prev);
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Filename:</label>
        <input
          type="text"
          name="filename"
          value={formData.filename}
          onChange={handleChange}
        />
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleQuestionForm}>Features</button>
        <button type="submit">Create Post</button>
      </form>

      {showQuestionForm && (
        <div className="question-form">
          <h3>Add a Question</h3>
          <label>Question Title:</label>
          <input
            type="text"
            name="title"
            value={newQuestion.title}
            onChange={handleQuestionChange}
          />
          <label>Type:</label>
          <select
            name="type"
            value={newQuestion.type}
            onChange={handleQuestionChange}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="fill-in-the-blank">Fill in the Blank</option>
            <option value="image-upload">Image Upload</option>
          </select>

          {newQuestion.type === "multiple-choice" && (
            <>
              <h4>Options:</h4>
              {newQuestion.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddOption}>
                Add Option
              </button>
            </>
          )}

          {newQuestion.type === "fill-in-the-blank" && (
            <>
              <label>Answer:</label>
              <input
                type="text"
                name="answer"
                value={newQuestion.answer}
                onChange={handleQuestionChange}
              />
            </>
          )}

          {newQuestion.type === "image-upload" && (
            <>
              <h4>Upload an Image:</h4>
              <input type="file" onChange={handleFileUpload} />
            </>
          )}

          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
      )}

      <div className="questions-preview">
        <h3>Questions Preview:</h3>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <h4>{question.title}</h4>
            <p>Type: {question.type}</p>
            {question.type === "multiple-choice" &&
              question.options.map((option, idx) => <p key={idx}>{option}</p>)}
            {question.type === "fill-in-the-blank" && <p>Answer: {question.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
} 