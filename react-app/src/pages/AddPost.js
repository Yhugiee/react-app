import React, { useState } from 'react';

function AddPost() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('image', image);
  
      const response = await fetch('http://localhost:3006/addPost', {
        method: 'POST',
        headers: {
          // Remove 'Content-Type' header to let the browser handle multipart form data
        },
        body: formData,
      });
  
      if (response.ok) {
        console.log('Post added successfully');
        // Redirect to home page
        window.location.href = 'http://localhost:3001/home';
      } else {
        console.error('Failed to add post');
        alert("Failed to add post");
        setErrorMessage('Failed to add post. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="post-container">
      <form onSubmit={handleFormSubmit} className="post-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="post">
          {image && (
            <img className="post-image" src={URL.createObjectURL(image)} alt="Uploaded" />
          )}
          <div className="post-body">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
