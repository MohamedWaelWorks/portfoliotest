import { Handler } from '@netlify/functions';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const data: EmailData = JSON.parse(event.body || '');
    
    // Here you can add your email sending logic
    // For example, using nodemailer or any other email service
    
    // For now, we'll just log the data and return success
    console.log('Form submission received:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Form submitted successfully',
        data: data,
      }),
    };
  } catch (error) {    const err = error as Error;
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid request body',
        error: err.message,
      }),
    };
  }
};
