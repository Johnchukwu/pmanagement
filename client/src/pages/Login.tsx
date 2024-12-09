import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode } from 'jwt-decode'; // Fix import here
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import '../styles/Login.css';

// Add this interface near the top of the file
interface CustomJwtPayload {
    role: string;
    uid: string;
    [key: string]: string | number | boolean;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log('Email:', email);
            console.log('Password:', password);
    
            const response = await axios.post(
                'http://localhost:3350/api/auth/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            const { token } = response.data;
    
            // Decode the token to extract uid and role
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            localStorage.setItem('role', decodedToken.role); // Store role
            localStorage.setItem('uid', decodedToken.uid);   // Store uid
    
            console.log(`Logged in as UID: ${decodedToken.uid}, Role: ${decodedToken.role}`);
    
            // Redirect based on role
            if (decodedToken.role === 'admin') {
                navigate('/admin-dashboard/sales'); // Navigate to a specific sub-route
            } else if (decodedToken.role === 'manager') {
                navigate('/dashboard'); // Navigate to ManagerDashboard
            } else {
                alert('Unknown role. Please contact support.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Login error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Invalid credentials'}`);
            } else {
                console.error('Login error:', error);
                alert('An unexpected error occurred');
            }
        }
    };
    

    return (
        <Box className="login-container">
            <div className="login-card">
                <Typography variant="h4" component="h1" className="login-title">
                    Login
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" fullWidth onClick={handleLogin}>
                    Login
                </Button>
                <Typography>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </Typography>
            </div>
        </Box>
    );
};

export default Login;
