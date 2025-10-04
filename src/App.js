import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';
import Layout from './components/Layout';
import OnboardingLayout from './components/OnboardingLayout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import DebugAuth from './components/DebugAuth';
import DatabaseTest from './components/DatabaseTest';

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

// Lazy load onboarding step components
const WelcomeStep = lazy(() => import('./components/onboarding/WelcomeStep'));
const BasicInfoStep = lazy(() => import('./components/onboarding/BasicInfoStep'));
const PhysicalInfoStep = lazy(() => import('./components/onboarding/PhysicalInfoStep'));
const LifestyleStep = lazy(() => import('./components/onboarding/LifestyleStep'));
const WorkoutPreferencesStep = lazy(() => import('./components/onboarding/WorkoutPreferencesStep'));
const GoalsStep = lazy(() => import('./components/onboarding/GoalsStep'));
const PhotoStep = lazy(() => import('./components/onboarding/PhotoStep'));
const OnboardingComplete = lazy(() => import('./components/onboarding/OnboardingComplete'));

import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
              <div className="App">
                <DebugAuth />
                <DatabaseTest />
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
              
              {/* Onboarding flow - nested routes */}
              <Route path="onboarding" element={
                <RouteGuard>
                  <OnboardingLayout />
                </RouteGuard>
              }>
                <Route index element={<Navigate to="welcome" replace />} />
                <Route path="welcome" element={<WelcomeStep />} />
                <Route path="basic-info" element={<BasicInfoStep />} />
                <Route path="physical-info" element={<PhysicalInfoStep />} />
                <Route path="lifestyle" element={<LifestyleStep />} />
                <Route path="workout-preferences" element={<WorkoutPreferencesStep />} />
                <Route path="goals" element={<GoalsStep />} />
                <Route path="photo" element={<PhotoStep />} />
                <Route path="complete" element={<OnboardingComplete />} />
              </Route>
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
