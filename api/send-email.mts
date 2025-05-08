import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const companyName = "LakbayViahero.ph"; // Your company name

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { name, email, phone, address, subject, service, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #0056b3; text-align: center; }
          h2 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          p { margin-bottom: 10px; }
          strong { color: #0056b3; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #777; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; color: #0056b3; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Inquiry from ${companyName}</h1>
          
          <h2>Contact Details</h2>
          <table>
            <tr><th>Name:</th><td>${name}</td></tr>
            <tr><th>Email:</th><td>${email}</td></tr>
            ${phone ? `<tr><th>Phone:</th><td>${phone}</td></tr>` : ''}
            ${address ? `<tr><th>Address:</th><td>${address}</td></tr>` : ''}
          </table>

          <h2>Inquiry Details</h2>
          <table>
            <tr><th>Subject:</th><td>${subject}</td></tr>
            <tr><th>Service of Interest:</th><td>${service}</td></tr>
          </table>

          <h2>Message</h2>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>

          <div class="footer">
            This email was sent from the contact form on ${companyName}.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'LakbayViahero Inquiry <onboarding@resend.dev>', // IMPORTANT: For production, use a verified domain with Resend.
      to: ['nimirelimi@gmail.com'], // Your email address
      subject: `New Contact Form Submission from ${name}: ${subject}`,
      html: emailHtml,
      replyTo: email, // Set the sender's email as the reply-to address
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (exception) {
    console.error('Server Exception:', exception);
    const errorMessage = exception instanceof Error ? exception.message : 'An unknown error occurred';
    return res.status(500).json({ error: 'Internal Server Error', details: errorMessage });
  }
} 