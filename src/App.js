import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Post from './components/Post';

// Main App component
export default function App() {
  return (
    <>
      {/* Define routes for different components */}
      <Routes>
        {/* Route for Signup component */}
        <Route exact path="/" element={<Signup />} />

        {/* Route for Post component */}
        <Route exact path="/Post" element={<Post />} />
      </Routes>
    </>
  );
}
