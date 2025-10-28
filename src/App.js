import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Trading Card Scanner Pages
const CardScanner = lazy(() => import('./pages/CardScanner'));
const CardResults = lazy(() => import('./pages/CardResults'));
const CardCollection = lazy(() => import('./pages/CardCollection'));
const DebugPanel = lazy(() => import('./pages/DebugPanel'));

// Original fitness app pages (kept for reference, but not used in main routes)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const WorkoutLogger = lazy(() => import('./pages/WorkoutLogger'));
const ProgressPhotos = lazy(() => import('./pages/ProgressPhotos'));
const MonthlyReports = lazy(() => import('./pages/MonthlyReports'));
const Profile = lazy(() => import('./pages/Profile'));

import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Main Trading Card Scanner Routes */}
              <Route path="/" element={<CardScanner />} />
              <Route path="/results" element={<CardResults />} />
              <Route path="/collection" element={<CardCollection />} />
              <Route path="/debug" element={<DebugPanel />} />
              
              {/* Legacy fitness app routes - hidden but preserved */}
              <Route path="/fitness/*" element={
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="workouts" element={<WorkoutLogger />} />
                  <Route path="progress" element={<ProgressPhotos />} />
                  <Route path="reports" element={<MonthlyReports />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              } />
              
              {/* Catch all route - redirect to scanner */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
