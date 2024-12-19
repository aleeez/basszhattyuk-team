import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import './App.css';
import HelloWorld from './components/HelloWorld';
import Register from './components/register/Register';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hello" element={<HelloWorld />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  );
}

export default App;
