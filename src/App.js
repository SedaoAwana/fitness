import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import SignInPage from './components/organisms/SignInPage';
import SignUpPage from './components/organisms/SignUpPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import WorkoutLogger from './pages/WorkoutLogger';
import ProgressPhotos from './pages/ProgressPhotos';
import MonthlyReports from './pages/MonthlyReports';
import Profile from './pages/Profile';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="onboarding/*" element={<Onboarding />} />
              <Route path="workouts" element={<WorkoutLogger />} />
              <Route path="progress" element={<ProgressPhotos />} />
              <Route path="reports" element={<MonthlyReports />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
