import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Inventory, Notifications, Assessment } from '@mui/icons-material'; // Importing Material UI Icons
import '../styles/Sidebar.css'; // Ensure this CSS file is linked correctly

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('name'); // Get the user name from localStorage
    const userInitials = userName?.split(' ').map((name) => name[0]).join('') || 'U'; // Generate initials

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                {/* Icon with User's Initials */}
                <div className="user-icon">{userInitials}</div>
                <span className="username">{userName}</span>
            </div>

            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to="sales" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <ShoppingCart className="sidebar-icon" /> Sales
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="inventory" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <Inventory className="sidebar-icon" /> Inventory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="reports" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <Assessment className="sidebar-icon" /> Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="notifications" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <Notifications className="sidebar-icon" /> Notifications
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
