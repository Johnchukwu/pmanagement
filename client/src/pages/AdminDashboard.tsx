import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Sales from './Sales';
import Inventory from './Inventory';
import Reports from './Reports';
import Notifications from './Notifications';

const AdminDashboard: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Routes>
                    {/* Nested Routes */}
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="notifications" element={<Notifications />} />
                    {/* Default redirect to /admindashboard/dashboard */}
                    <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
