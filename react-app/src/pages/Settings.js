// Settings.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Settings.css'; // Import the CSS file

const Settings = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Implement the logic to update the username and profile picture
      console.log('Username:', username);
      console.log('Profile picture:', profilePicture);
      // Redirect or perform any other action upon successful update
    } catch (error) {
      console.error('Error updating settings:', error);
      setErrorMessage('An error occurred while updating settings. Please try again later.');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <FontAwesomeIcon icon={faCog} size="lg" />
        <h1>Settings</h1>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Display current profile picture */}
      {profilePicture && (
        <div className="current-profile-picture">
          <img src={require('../images/ironpanther.png')} alt="Current Profile" />
        </div>
      )}
      <form className="settings-form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
