import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/CreatePost.css'; 

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    filename: "",
    content: "",
  });

  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log("UserId:", userId);
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

  const handleFeatures = () => {
    setShowPlaceholder((prev) => !prev);
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
        <button type="button" onClick={handleFeatures}>Features</button>
        <button type="submit">Create Post</button>
      </form>

      
      {showPlaceholder && (
        <div className="placeholder-square">
          Placeholder
        </div>
      )}
    </div>
  );
}