// services/emailService.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // ✅ Use Gmail service (auto sets host & port)
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });
};

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"PG Management" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2c3e50; text-align: center;">Password Reset Request</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">We received a request to reset your password for your PG Management account. Use the OTP below to proceed:</p>
            <div style="background-color: #3498db; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #555; font-size: 16px;">This OTP is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
            <p style="color: #555; font-size: 16px;">Best regards,<br>The PG Management Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = { sendOtpEmail };
