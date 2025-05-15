import { Resend } from 'resend';

// Get the API key from environment variables or use the provided key
const API_KEY = import.meta.env.VITE_RESEND_API_KEY || 're_B8LwJ2SP_3oiLUNvEgBqTqfB27V3wmSN4';

// Initialize Resend with API key
const resend = new Resend(API_KEY);

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  service: string;
  message: string;
};

/**
 * Send an email with the contact form data
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const { name, email, phone, address, subject, service, message } = data;
    
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
    
    console.log("Attempting to send email with Resend...");
    
    // Try the direct API call first
    try {
      // Send the email using Resend
      const response = await resend.emails.send({
        from: 'LakbayViahero <onboarding@resend.dev>',
        to: ['nimirelimi@gmail.com'],
        subject: `New Contact Form: ${subject}`,
        html: htmlContent,
        replyTo: email
      });
      
      console.log("Resend API response:", response);
      
      if (response.error) {
        throw response.error;
      }
      
      return { 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      };
    } catch (apiError) {
      console.error('Direct API call failed:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('Email service error:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    };
  }
} 