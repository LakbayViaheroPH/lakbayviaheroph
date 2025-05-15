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
 * Send an email with the contact form data through the Vite proxy
 */
export async function sendContactFormEmailViaProxy(data: ContactFormData): Promise<{ success: boolean; message: string }> {
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
    
    console.log("Attempting to send email via Vite proxy...");
    
    // The API key
    const API_KEY = import.meta.env.VITE_RESEND_API_KEY || 're_B8LwJ2SP_3oiLUNvEgBqTqfB27V3wmSN4';
    
    // Send the email using the proxy
    const response = await fetch('/api/resend/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        from: 'LakbayViahero <onboarding@resend.dev>',
        to: ['nimirelimi@gmail.com'],
        subject: `New Contact Form: ${subject}`,
        html: htmlContent,
        reply_to: email
      })
    });
    
    // Parse the response
    const responseData = await response.json();
    console.log("Proxy API response:", responseData);
    
    if (!response.ok) {
      return { 
        success: false, 
        message: responseData.message || 'Failed to send your message. Please try again later.' 
      };
    }
    
    return { 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    };
  } catch (error) {
    console.error('Email service error:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    };
  }
} 