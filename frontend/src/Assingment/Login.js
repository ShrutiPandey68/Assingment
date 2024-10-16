import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css'; // Import the CSS file

const Login = () => {
    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    // Static credentials for testing
    const staticCredentials = {
        email: 'test@example.com', // Replace with your static email
        password: 'password123' // Replace with your static password
    };

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError(''); // Reset error state

        // Simulate login logic using static credentials
        if (email === staticCredentials.email && password === staticCredentials.password) {
            console.log('Login successful');
            // Redirect to Admin Panel upon successful login
            navigate('/'); // Use navigate to redirect
        } else {
            setError('Login failed, please check your credentials.'); // Set error message
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required
                    className="login-input"
                />
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;

