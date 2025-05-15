import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, email, phone, address, subject, service, message } = req.body;

    // Basic validation (you can expand this)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Address:</strong> ${address || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Service:</strong> ${service || 'N/A'}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `;

    const response = await resend.emails.send({
      from: 'LakbayViahero <onboarding@resend.dev>', // Ensure this email is verified in Resend
      to: ['nimirelimi@gmail.com'],
      subject: `New Contact Form: ${subject}`,
      html: htmlContent,
      replyTo: email,
    });

    if (response.error) {
      console.error('Resend API Error:', response.error);
      return res.status(400).json({ 
        success: false, 
        message: response.error.message || 'Failed to send message via Resend.'
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });

  } catch (error: any) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'An unexpected server error occurred.'
    });
  }
}