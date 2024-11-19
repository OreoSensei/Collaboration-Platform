import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DocumentEditor from './pages/DocumentEditor.jsx';
import ProfileSettings from './pages/ProfileSettings.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/document/:id' 
          element={
            <PrivateRoute>
              <DocumentEditor />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/profile' 
          element={
            <PrivateRoute>
              <ProfileSettings />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;