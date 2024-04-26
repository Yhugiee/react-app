import React, { useState, useEffect } from 'react';
import './Home.css';
import Nav from '../components/Nav';
import Users from '../components/Users';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3006/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await response.json();
        // Reverse the order of posts
        setPosts(postsData.rows.reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Nav />
      <Users />

      <div className="post-button">
        <Post />
      </div>

      <div className="post-container">
        {posts.map((post) => (
          <div className="post-form" key={post.id}>
            <div className="post">
              <PostItem post={post} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const PostItem = ({ post }) => {
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    // Convert buffer data to base64 using FileReader API
    const blob = new Blob([new Uint8Array(post.image_upload.data)], { type: 'image/png' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
  }, [post]);

  return (
    <>
      <img className="post-image" src={base64Image} alt={post.description} />
      <div className="post-body">
        <p className="post-text">{post.description}</p>
      </div>
    </>
  );
};

export default Home;
