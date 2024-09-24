import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/CreatePost.css';


export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    filename: "",
    content: "",
  });

  useEffect(() => {
    // Fetch the post data by postId
    axios
      .get(`http://localhost:4000/posts/${postId}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatures = () => {
    navigate("/features"); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/posts/${postId}`, formData)
      .then(() => {
        alert("Post updated successfully!");
        navigate("/dashboard"); // Go back to dashboard after update
      })
      .catch((err) => console.error(err));
  };

  return (
    <div  className="create-post-container">
      <h2>Edit Post</h2>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
