import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const endpoint = isLogin ? '/api/login' : '/api/register';

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    onLoginSuccess(data.username, data.token);
                    onClose();
                } else {
                    setMessage('Registration successful! Please sign in.');
                    setIsLogin(true);
                }
            } else {
                setMessage(data.message || 'An error occurred');
            }
        } catch (error) {
            setMessage('Connection error. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content premium-card animate-fade-in" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="serif">{isLogin ? 'Welcome Back' : 'Join the Sanctuary'}</h2>
                <p className="subtitle">{isLogin ? 'Sign in to your account' : 'Start your green journey today'}</p>

                {message && <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'}`}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="elegance@evergreen.com" />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Your username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register Now' : 'Sign In'}</span>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
