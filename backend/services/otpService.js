// Mock OTP service for demonstration purposes
class OtpService {
  constructor() {
    this.otpStorage = {};
  }

  // Generate a random 6-digit OTP
  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Simulate sending OTP to email
  async sendOtp(email) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Check if email is valid
        if (!this.isValidEmail(email)) {
          reject(new Error('Invalid email address'));
          return;
        }

        // Generate OTP
        const otp = this.generateOtp();
        
        // Store OTP with expiration (5 minutes)
        this.otpStorage[email] = {
          otp: otp,
          expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes from now
        };

        // In a real app, you would send this OTP via email
        console.log(`OTP sent to ${email}: ${otp}`);
        
        // Simulate successful email sending
        resolve({
          success: true,
          message: 'OTP sent successfully',
          otp: otp // Only for demo purposes - in real app, don't return OTP
        });
      }, 1000); // Simulate network delay
    });
  }

  // Verify OTP
  async verifyOtp(email, otp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedData = this.otpStorage[email];
        
        // Check if OTP exists for this email
        if (!storedData) {
          reject(new Error('No OTP found for this email'));
          return;
        }

        // Check if OTP has expired
        if (Date.now() > storedData.expiresAt) {
          // Remove expired OTP
          delete this.otpStorage[email];
          reject(new Error('OTP has expired'));
          return;
        }

        // Check if OTP matches
        if (storedData.otp === otp) {
          // OTP is valid, remove it
          delete this.otpStorage[email];
          resolve({
            success: true,
            message: 'OTP verified successfully'
          });
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 500); // Simulate network delay
    });
  }

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if an OTP was sent to an email
  hasOtp(email) {
    return !!this.otpStorage[email];
  }

  // Get remaining time for OTP
  getOtpExpiry(email) {
    const storedData = this.otpStorage[email];
    if (!storedData) return 0;
    
    const remainingTime = storedData.expiresAt - Date.now();
    return Math.max(0, remainingTime);
  }
}

// Create a singleton instance
const otpService = new OtpService();

export default otpService;