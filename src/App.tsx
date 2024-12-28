import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { BlogPage } from './pages/Blog/BlogPage';
import { ResourcesPage } from './pages/Resources/ResourcesPage';
import { StaffDashboard } from './pages/Staff/StaffDashboard';
import { ProfessionalsPage } from './pages/Professionals/ProfessionalsPage';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/recursos" element={<ResourcesPage />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/profesionales" element={<ProfessionalsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}