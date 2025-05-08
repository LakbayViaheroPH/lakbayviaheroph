import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, address, subject, service, message } = req.body;

  if (!name || !email || !subject || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const html = `
    <h2>New Inquiry from LakbayViahero.ph</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: 'LakbayViahero <onboarding@resend.dev>',
      to: ['nimirelimi@gmail.com'],
      subject: `New Contact Form Submission: ${subject}`,
      html,
      replyTo: email,
    });

    if (error) {
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}