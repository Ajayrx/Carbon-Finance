import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeProvider } from './components/Navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import UploadSection from './components/UploadSection';
import CreditsDashboard from './components/CreditsDashboard';
import ReportsPage from './pages/ReportsPage';
import VerificationSection from './components/VerificationSection';
import HistorySection from './components/HistorySection';
import OfficialsLogin from './pages/OfficialsLogin';
import CertificateForm from './pages/CertificateForm';
import OfficialsDashboard from './pages/OfficialsDashboard';
import CertificateVerification from './pages/CertificateVerification';
import CertificateUpload from './components/CertificateUpload';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const OfficialProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const officialUser = localStorage.getItem('officialUser');
  return officialUser ? <>{children}</> : <Navigate to="/officials/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/officials/login" element={<OfficialsLogin />} />
        <Route 
          path="/officials/dashboard" 
          element={
            <OfficialProtectedRoute>
              <OfficialsDashboard />
            </OfficialProtectedRoute>
          } 
        />
        <Route 
          path="/officials/certificate-form" 
          element={
            <OfficialProtectedRoute>
              <CertificateForm />
            </OfficialProtectedRoute>
          } 
        />
        <Route path="/verify/:certificateId" element={<CertificateVerification />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/certificate-upload" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <CertificateUpload />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <UploadSection />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/credits" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <CreditsDashboard />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <ReportsPage />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/verification" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <VerificationSection />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <Dashboard>
                <HistorySection />
              </Dashboard>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <div className="font-inter antialiased bg-white dark:bg-gray-900 transition-colors duration-300">
            <AppRoutes />
          </div>
        </Router>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;