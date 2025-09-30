import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';
import Layout from './components/Layout';
import OnboardingLayout from './components/OnboardingLayout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const EmailVerificationSuccess = lazy(() => import('./components/EmailVerificationSuccess'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const WorkoutLogger = lazy(() => import('./pages/WorkoutLogger'));
const ProgressPhotos = lazy(() => import('./pages/ProgressPhotos'));
const MonthlyReports = lazy(() => import('./pages/MonthlyReports'));
const Profile = lazy(() => import('./pages/Profile'));

import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <div className="App">
            <Suspense fallback={<LoadingSpinner />}>
            <Routes>
            {/* Public routes - no authentication required */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/email-verified" element={<EmailVerificationSuccess />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              {/* Default redirect to dashboard */}
              <Route index element={
                <RouteGuard>
                  <Navigate to="/dashboard" replace />
                </RouteGuard>
              } />
              
              {/* Main app routes - require completed onboarding */}
              <Route path="dashboard" element={
                <RouteGuard requireOnboarding={true}>
                  <Dashboard />
                </RouteGuard>
              } />
              <Route path="workouts" element={
                <RouteGuard requireOnboarding={true}>
                  <WorkoutLogger />
                </RouteGuard>
              } />
              <Route path="progress" element={
                <RouteGuard requireOnboarding={true}>
                  <ProgressPhotos />
                </RouteGuard>
              } />
              <Route path="reports" element={
                <RouteGuard requireOnboarding={true}>
                  <MonthlyReports />
                </RouteGuard>
              } />
              <Route path="profile" element={
                <RouteGuard requireOnboarding={true}>
                  <Profile />
                </RouteGuard>
              } />
              
              {/* Onboarding flow - separate layout */}
              <Route path="onboarding" element={
                <RouteGuard>
                  <OnboardingLayout>
                    <Onboarding />
                  </OnboardingLayout>
                </RouteGuard>
              } />
            </Route>
            
            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            </Suspense>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
