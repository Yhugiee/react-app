import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PageNotFound from './pages/PageNotFound';
import './App.css';

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/addPost" element={<AddPost/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;