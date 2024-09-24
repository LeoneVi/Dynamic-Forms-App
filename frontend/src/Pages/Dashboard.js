import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
    } else {
      // Fetch posts for the logged-in user
      axios
        .get(`http://localhost:4000/posts?userId=${userId}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleCreate = () => {
    console.log("Create button clicked");  // Add a log to check if this runs
    navigate("/create"); // Navigate to the Create Post page
  };

  return (
    <div>
      <center>
        <h2>Dashboard</h2>
        <button onClick={handleCreate}>Create New Post</button> {/* Create post button */}
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <button
                key={post._id}
                onClick={() => handleEdit(post._id)}
                style={{ display: "block", margin: "10px 0" }}
              >
                {post.title}
              </button>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </center>
    </div>
  );
}
