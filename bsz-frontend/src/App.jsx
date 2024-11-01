import React from 'react';
import './App.css';
import HelloWorld from './components/HelloWorld';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hello" element={<HelloWorld />} />
        </Routes>
    </Router>
  );
}

export default App;
