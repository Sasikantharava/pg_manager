import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
    // State management
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpExpiry, setOtpExpiry] = useState(0);
    const [canResend, setCanResend] = useState(false);
    const [resetToken, setResetToken] = useState(''); // Added reset token state
    
    const navigate = useNavigate();

    // OTP expiry timer
    useEffect(() => {
        let timer;
        if (step === 2 && otpExpiry > 0) {
            timer = setInterval(() => {
                setOtpExpiry(prev => {
                    const newTime = prev - 1000;
                    if (newTime <= 0) {
                        setCanResend(true);
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, otpExpiry]);

    // Send OTP to user's email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await api.sendOtp(email);
            setSuccess(response.message);
            setStep(2);
            setOtpExpiry(5 * 60 * 1000); // 5 minutes in milliseconds
            setCanResend(false);
            
            // Allow resending after 30 seconds
            setTimeout(() => {
                setCanResend(true);
            }, 30000);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP entered by user
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await api.verifyOtp(email, otp);
            // Store the reset token from the response
            if (response.resetToken) {
                setResetToken(response.resetToken);
                setStep(3);
            } else {
                throw new Error('Reset token not received from server');
            }
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset user's password
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Password validation
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }
        
        // Password strength validation
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /\d/.test(newPassword);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            setError('Password must contain uppercase, lowercase, and numbers.');
            setIsLoading(false);
            return;
        }
        
        try {
            // Send the reset token along with the new password
            const response = await api.resetPassword(email, newPassword, resetToken);
            setStep(4);
        } catch (err) {
            // Handle token expiration specifically
            if (err.message.includes('Invalid or expired reset token')) {
                setError('Your session has expired. Please request a new OTP.');
                // Reset the flow
                setTimeout(() => {
                    setStep(1);
                    setEmail('');
                    setOtp('');
                    setResetToken('');
                }, 2000);
            } else {
                setError(err.message || 'Failed to reset password. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP functionality
    const handleResendOtp = async () => {
        if (!canResend) return;
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await api.sendOtp(email);
            setSuccess(response.message);
            setOtpExpiry(5 * 60 * 1000); // 5 minutes in milliseconds
            setCanResend(false);
            
            // Allow resending after 30 seconds
            setTimeout(() => {
                setCanResend(true);
            }, 30000);
        } catch (err) {
            setError(err.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Format time for display (MM:SS)
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    <div className="card-header">
                        <h1>Reset Password</h1>
                        {step === 1 && <p>Enter your email address and we'll send you an OTP to reset your password.</p>}
                        {step === 2 && <p>Enter the OTP sent to your email address.</p>}
                        {step === 3 && <p>Create a new password for your account.</p>}
                        {step === 4 && <p>Your password has been successfully reset!</p>}
                    </div>
                    
                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="forgot-password-form">
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                    />
                                    <span className="input-icon">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send OTP'}
                            </button>
                            
                            <div className="form-footer">
                                <p>Remember your password? <Link to="/login">Back to Login</Link></p>
                            </div>
                        </form>
                    )}
                    
                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="forgot-password-form">
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="otp">Enter OTP</label>
                                <div className="otp-inputs">
                                    {[1, 2, 3, 4, 5, 6].map((index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            className="otp-input"
                                            value={otp[index - 1] || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    const newOtp = otp.split('');
                                                    newOtp[index - 1] = value;
                                                    setOtp(newOtp.join(''));
                                                    
                                                    // Auto-focus next input
                                                    if (value && index < 6) {
                                                        const nextInput = document.getElementById(`otp-${index + 1}`);
                                                        if (nextInput) nextInput.focus();
                                                    }
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                // Handle backspace
                                                if (e.key === 'Backspace' && !otp[index - 1] && index > 1) {
                                                    const prevInput = document.getElementById(`otp-${index - 1}`);
                                                    if (prevInput) prevInput.focus();
                                                }
                                            }}
                                            id={`otp-${index}`}
                                        />
                                    ))}
                                </div>
                                <p className="otp-hint">Enter the 6-digit OTP sent to your email</p>
                                
                                {otpExpiry > 0 && (
                                    <div className="otp-timer">
                                        <i className="fas fa-clock"></i> OTP expires in: {formatTime(otpExpiry)}
                                    </div>
                                )}
                            </div>
                            
                            <button
                                type="submit"
                                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading || otp.length !== 6}
                            >
                                {isLoading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                            
                            <div className="resend-otp">
                                <p>Didn't receive the OTP?
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isLoading || !canResend}
                                        className={canResend ? 'active' : ''}
                                    >
                                        {canResend ? 'Resend OTP' : `Resend in ${formatTime(30000 - (5 * 60 * 1000 - otpExpiry))}`}
                                    </button>
                                </p>
                            </div>
                            
                            <div className="form-footer">
                                <button type="button" className="back-btn" onClick={() => setStep(1)}>
                                    <i className="fas fa-arrow-left"></i> Back
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* Step 3: Password Reset */}
                    {step === 3 && (
                        <form onSubmit={handleUpdatePassword} className="forgot-password-form">
                            {error && <div className="error-message">{error}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="Enter new password"
                                    />
                                    <span
                                        className="input-icon toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm new password"
                                    />
                                    <span
                                        className="input-icon toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            
                            <div className="password-requirements">
                                <p>Password must:</p>
                                <ul>
                                    <li className={newPassword.length >= 8 ? 'valid' : ''}>
                                        <i className={`fas ${newPassword.length >= 8 ? 'fa-check' : 'fa-times'}`}></i>
                                        Be at least 8 characters long
                                    </li>
                                    <li className={/[A-Z]/.test(newPassword) ? 'valid' : ''}>
                                        <i className={`fas ${/[A-Z]/.test(newPassword) ? 'fa-check' : 'fa-times'}`}></i>
                                        Contain at least one uppercase letter
                                    </li>
                                    <li className={/[a-z]/.test(newPassword) ? 'valid' : ''}>
                                        <i className={`fas ${/[a-z]/.test(newPassword) ? 'fa-check' : 'fa-times'}`}></i>
                                        Contain at least one lowercase letter
                                    </li>
                                    <li className={/\d/.test(newPassword) ? 'valid' : ''}>
                                        <i className={`fas ${/\d/.test(newPassword) ? 'fa-check' : 'fa-times'}`}></i>
                                        Contain at least one number
                                    </li>
                                    <li className={newPassword === confirmPassword && confirmPassword ? 'valid' : 'invalid'}>
                                        <i className={`fas ${newPassword === confirmPassword && confirmPassword ? 'fa-check' : 'fa-times'}`}></i>
                                        Match the confirm password
                                    </li>
                                </ul>
                            </div>
                            
                            <button
                                type="submit"
                                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </button>
                            
                            <div className="form-footer">
                                <button type="button" className="back-btn" onClick={() => setStep(2)}>
                                    <i className="fas fa-arrow-left"></i> Back
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* Step 4: Success Message */}
                    {step === 4 && (
                        <div className="success-message">
                            <div className="success-icon">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2>Password Reset Successful!</h2>
                            <p>Your password has been successfully updated. You can now log in with your new password.</p>
                            <div className="success-actions">
                                <Link to="/login" className="btn btn-primary">
                                    Go to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="help-section">
                    <h3>Need Help?</h3>
                    <p>If you're having trouble accessing your account, contact our support team for assistance.</p>
                    <Link to="/contact" className="help-link">Contact Support</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;