const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = {
  // Send OTP
  sendOtp: async (email) => {
    try {
      const url = `${API_URL}/auth/send-otp`;
      console.log('API URL from env:', process.env.REACT_APP_API_URL);
      console.log('Full URL being requested:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      console.log('Response status:', response.status);
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to send OTP');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Send OTP Error:', error);
      throw error;
    }
  },
  
  // Verify OTP
  verifyOtp: async (email, otp) => {
    try {
      const url = `${API_URL}/auth/verify-otp`;
      console.log('Full URL being requested:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Invalid OTP');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Verify OTP Error:', error);
      throw error;
    }
  },
  
  // Reset password - FIXED to include reset token
  resetPassword: async (email, newPassword, resetToken) => {
    try {
      const url = `${API_URL}/auth/reset-password`;
      console.log('Full URL being requested:', url);
      console.log('Sending reset token:', resetToken ? 'Yes' : 'No');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, resetToken }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to reset password');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Reset Password Error:', error);
      throw error;
    }
  },
};
export default api;