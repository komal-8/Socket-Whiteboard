import React, { useState, useEffect } from 'react';

function Blog() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const [formData, setFormData] = useState({
    Name: '',
    image: '',
    content: '',
    author: userId // Set author to userId
  });

  useEffect(() => {
    // Retrieve user's ID from local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    console.log(userId);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      // Include userId in formData
      const dataWithAuthor = {
        ...formData,
        author: userId
      };

      const response = await fetch('http://localhost:8080/api/blog/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataWithAuthor) // Send data with author included
      });

      if (response.ok) {
        console.log('Blog post created successfully');
        console.log(userId);
        // Optionally, redirect the user or show a success message
      } else {
        console.error('Failed to create blog post');
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      // Handle errors
    }
  };

  return (
    <div>
      <h1>Blog</h1>
      {userId !== '' ? ( // Conditionally render the form based on login status
        <form onSubmit={handleSubmit}>
          <input type="text" id="Name" placeholder="Name" value={formData.Name} onChange={handleChange} />
          <input type="text" id="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          <textarea id="content" placeholder="Content" value={formData.content} onChange={handleChange}></textarea>
          <button type="submit">Add Post</button>
        </form>
      ) : (
        <p>Please log in to add blogs.</p>
      )}
    </div>
  );
}

export default Blog;
