import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard
import Dashboard from './pages/Dashboard'; // Manager Dashboard
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';

const App: React.FC = () => {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    useEffect(() => {
        // Listen for changes in localStorage to update role state
        const handleStorageChange = () => {
            setRole(localStorage.getItem('role'));
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Manager Dashboard */}
                <Route
                    path="/dashboard"
                    element={role === 'manager' ? <Dashboard /> : <Navigate to="/" />}
                />

                {/* Admin Dashboard */}
                <Route
                    path="/admin-dashboard"
                    element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
                >
                    <Route path="sales" element={<Sales />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>

                {/* Fallback for unmatched routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
