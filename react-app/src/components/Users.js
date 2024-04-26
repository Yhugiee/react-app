import React from 'react';
import './Users.css'; 

const Users = () => {
  return (
    <div className="image-icons-container">
      <div className="image-icon"><img src={require('../images/ironman.jpg')} alt="Icon 1" /></div>
      <div className="image-icon"><img src={require('../images/hulk.png')} alt="Icon 2" /></div>
      <div className="image-icon"><img src={require('../images/blackpanther.png')} alt="Icon 3" /></div>
      <div className="image-icon"><img src={require('../images/drstrange.jpg')} alt="Icon 4" /></div>
      <div className="image-icon"><img src={require('../images/captainamerica.jpg')} alt="Icon 5" /></div>
      <div className="image-icon"><img src={require('../images/blackwidow.jpg')} alt="Icon 6" /></div>
      <div className="image-icon"><img src={require('../images/spiderman.jpg')} alt="Icon 7" /></div>
      <div className="image-icon"><img src={require('../images/falcon.jpg')} alt="Icon 8" /></div>
      <div className="image-icon"><img src={require('../images/hawkeye.jpg')} alt="Icon 9" /></div>
      <div className="image-icon"><img src={require('../images/thor.jpg')} alt="Icon 10" /></div>
      <div className="image-icon"><img src={require('../images/thanos.jpg')} alt="Icon 11" /></div>
      <div className="image-icon"><img src={require('../images/antman.jpg')} alt="Icon 12" /></div>
    </div>
  );
};

export default Users;