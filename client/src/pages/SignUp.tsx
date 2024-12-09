import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../styles/SignUp.css';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager'); // Default role

    const handleSignUp = async () => {
        try {
            await axios.post('http://localhost:3350/api/auth/register', { name, email, password, role });
            alert('User registered successfully. Please log in.');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error during registration');
        }
    };

    return (
        <Box className="signup-container">
            <div className="signup-card">
                <Typography variant="h4" component="h1" className="signup-title">
                    Sign Up
                </Typography>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="signup-input"
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <FormControl fullWidth className="signup-input">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label="Role"
                    >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" fullWidth onClick={handleSignUp}>
                    Sign Up
                </Button>
                <Typography>
                    Already have an account? <a href="/">Log In</a>
                </Typography>
            </div>
        </Box>
    );
};

export default SignUp;
