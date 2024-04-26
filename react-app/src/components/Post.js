import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faPlus } from '@fortawesome/free-solid-svg-icons';

function AddPost() {
 
  const handleRedirectToAddPost = () => {
    window.location.href = '/addPost';
  };

  return (
    <div>
      <button onClick={handleRedirectToAddPost}>
      <FontAwesomeIcon icon={faPlus} beat />
      </button>
    </div>
  );
}

export default AddPost;
