const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3001;

// API key for Resend
const resend = new Resend('re_B8LwJ2SP_3oiLUNvEgBqTqfB27V3wmSN4');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, address, subject, service, message } = req.body;
    
    // Create HTML content for the email
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Service:</strong> ${service}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `;
    
    // Send the email using Resend
    const response = await resend.emails.send({
      from: 'LakbayViahero <onboarding@resend.dev>',
      to: ['nimirelimi@gmail.com'],
      subject: `New Contact Form: ${subject}`,
      html: htmlContent,
      replyTo: email
    });
    
    if (response.error) {
      console.error('Email sending error:', response.error);
      return res.status(400).json({ 
        success: false, 
        message: 'Failed to send your message. Please try again later.' 
      });
    }
    
    return res.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });
  } catch (error) {
    console.error('Email service error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 