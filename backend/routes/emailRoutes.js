// backend/routes/emailRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create transporter with error handling
const createTransporter = () => {
  try {
    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }
    
    // Fixed: Changed createTransporter to createTransport
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Error creating email transporter:', error);
    throw error;
  }
};

// Send email endpoint with enhanced error handling
router.post('/send-receipt', async (req, res) => {
  try {
    console.log('Email request received:', req.body);
    
    const { to, subject, html } = req.body;
    
    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({ 
        message: 'Missing required fields: to, subject, or html' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ 
        message: 'Invalid email address format' 
      });
    }
    
    const transporter = createTransporter();
    const mailOptions = {
      from: `"PG Management System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: 'Please view this email in an HTML-capable email client.'
    };
    
    console.log('Sending email to:', to);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({ 
      message: 'Receipt sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        message: 'Email authentication failed. Please check your email credentials.' 
      });
    }
    
    if (error.code === 'ESOCKET') {
      return res.status(500).json({ 
        message: 'Network error. Please check your internet connection.' 
      });
    }
    
    if (error.message.includes('535-5.7.8')) {
      return res.status(500).json({ 
        message: 'Email not sent. Please enable less secure apps in your Google account settings.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to send receipt email: ' + error.message 
    });
  }
});

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { to } = req.body;
    
    if (!to) {
      return res.status(400).json({ message: 'Email address is required' });
    }
    
    const transporter = createTransporter();
    const mailOptions = {
      from: `"PG Management System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Test Email from PG Management System',
      html: '<h1>Test Email</h1><p>This is a test email from PG Management System.</p>',
      text: 'This is a test email from PG Management System.'
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Test email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ 
      message: 'Failed to send test email: ' + error.message 
    });
  }
});

module.exports = router;