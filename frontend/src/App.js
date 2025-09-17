// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import Rooms from './pages/Rooms';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
// Import the new pages
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import ProtectedRoute from './components/ProtectedRoute';
import TenantManagement from './pages/TenantManagement';
import RoomManagement from './pages/RoomManagement';
import PaymentTracking from './pages/PaymentTracking';
import AnalyticsReports from './pages/AnalyticsReports';
import MobileFriendly from './pages/MobileFriendly';
import SecureReliable from './pages/SecureReliable';
import Integrations from './pages/Integrations';
import Updates from './pages/Updates';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Press from './pages/Press';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import './App.css';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Layout for protected routes
    const ProtectedLayout = ({ children }) => (
        <div className="d-flex">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <main className="main-content">
                {children}
            </main>
        </div>
    );

    return (
        <AuthProvider>
            <Router future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Static Pages */}
                        <Route path="/features" element={<Features />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/tenant-management" element={<TenantManagement />} />
                        <Route path="/room-management" element={<RoomManagement />} />
                        <Route path="/payment-tracking" element={<PaymentTracking />} />
                        <Route path="/analytics-reports" element={<AnalyticsReports />} />
                        <Route path="/mobile-friendly" element={<MobileFriendly />} />
                        <Route path="/secure-reliable" element={<SecureReliable />} />
                        <Route path="/integrations" element={<Integrations />} />
                        <Route path="/updates" element={<Updates />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/press" element={<Press />} />
                        <Route path="/help-center" element={<HelpCenter />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        {/* Protected Routes */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <Dashboard />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/tenants" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <Tenants />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/rooms" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <Rooms />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/payments" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <Payments />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/reports" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <Reports />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;