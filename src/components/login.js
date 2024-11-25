import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';  
import './login.css'; 

const Login = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:3001/login', { 
                usernameOrEmail, 
                password 
            });
    
            const token = response.data.token; // Get the JWT token
            const userId = response.data.userId;
            const role = response.data.role;
    
            // Store the token in localStorage
            localStorage.setItem('token', token);
    
            // Store the userId and role if needed
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
    
            console.log(`Response received:`, response.data); 
            console.log(`Role received: '${role}'`);
    
            if (role === 'admin') {
                navigate('/officerdashboard1'); // Navigate to admin dashboard
            } else if (role === 'member') {
                navigate('/'); // Navigate to member landing page
            }
    
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your username/email and password.');
        }
    };
    

    const handleBack = () => {
        navigate('/'); 
    };
    
    
    const handleRegister = () => {
        navigate('/signup'); 
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <button className="back-btn" onClick={handleBack}>Back</button>
               {/* <button className="reg-btn" onClick={handleRegister}>Register</button>*/} 
                <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logolog"/>
                <h2 className="loginh2">MSU-IIT National Multi-Purpose Cooperative</h2>
                <p className="loginp">Your Gateway to Financial Possibilities.</p>
                <form onSubmit={handleSubmit}>
                    <label className="labels">Username</label>
                    <input 
                        type="text" 
                        id="usernameoremail"
                        className="login"
                        placeholder="Username or Email..." 
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                    <label className="labels">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        className="login"
                        placeholder="**************" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" >Remember me</label>
                        </div>
                        <a href="#" className="forgot">Forgot Password?</a>
                    </div>
                    <button className="login-btn">Login</button>
                </form>
                
                <button className="register-btn" onClick={handleRegister}>Register</button>
                
            </div>
        </div>
    );
};

export default Login;