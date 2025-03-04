import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskBoard /> : <Navigate to="/login" replace />} 
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
