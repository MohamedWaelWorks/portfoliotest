import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '@/config/email-config';

type EmailData = Record<string, unknown> & {
  from_name: string | FormDataEntryValue | null;
  from_email: string | FormDataEntryValue | null;
  message: string | FormDataEntryValue | null;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      data,
      EMAIL_CONFIG.PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
