import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Email transporter configuration
const transporter: Transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: parseInt(import.meta.env.SMTP_PORT),
    secure: parseInt(import.meta.env.SMTP_PORT) === 465,
    auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

interface EmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<EmailResult> {
    try {
        const info = await transporter.sendMail({
            from: import.meta.env.SMTP_USER,
            to,
            subject,
            text,
            html: html || text,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Template für Kontaktformular-Emails
export function createContactEmailContent(formData: ContactFormData): { text: string; html: string } {
    const text = `
Kvix.de - Kontaktformular von ${formData.name}

Email: ${formData.email}
Betreff: ${formData.subject}

Nachricht:
${formData.message}
    `.trim();

    const html = `
        <h2>Neue Kontaktanfrage von ${formData.name}</h2>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Betreff:</strong> ${formData.subject}</p>
        <h3>Nachricht:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
    `.trim();

    return { text, html };
}

// Template für Newsletter-Bestätigungsemail
export function createNewsletterConfirmationEmail(email: string): { text: string; html: string } {
    const text = `
Vielen Dank für Ihre Newsletter-Anmeldung!

Sie haben sich erfolgreich für unseren Newsletter angemeldet. 
Sie werden von nun an regelmäßig Updates und Neuigkeiten von uns erhalten.

Falls Sie diese Anmeldung nicht vorgenommen haben, können Sie sich jederzeit abmelden.

Mit freundlichen Grüßen
Ihr Team
    `.trim();

    const html = `
        <h2>Vielen Dank für Ihre Newsletter-Anmeldung!</h2>
        <p>Sie haben sich erfolgreich für unseren Newsletter angemeldet.</p>
        <p>Sie werden von nun an regelmäßig Updates und Neuigkeiten von uns erhalten.</p>
        <p><small>Falls Sie diese Anmeldung nicht vorgenommen haben, können Sie sich jederzeit abmelden.</small></p>
        <br>
        <p>Mit freundlichen Grüßen<br>Ihr Team</p>
    `.trim();

    return { text, html };
}
