import type { APIRoute } from 'astro';
import { sendEmail, createContactEmailContent } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const subject = formData.get('subject')?.toString();
        const message = formData.get('message')?.toString();

        // Validierung
        if (!name || !email || !subject || !message) {
            return new Response(JSON.stringify({
                message: 'Alle Felder müssen ausgefüllt sein.'
            }), { status: 400 });
        }

        // Email-Format validieren
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({
                message: 'Ungültige Email-Adresse.'
            }), { status: 400 });
        }

        // Email-Inhalt erstellen
        const { text, html } = createContactEmailContent({
            name,
            email,
            subject,
            message
        });

        // Email senden
        const result = await sendEmail({
            to: import.meta.env.CONTACT_EMAIL,
            subject: `Neue Kontaktanfrage: ${subject}`,
            text,
            html
        });

        if (!result.success) {
            throw new Error(result.error);
        }

        return new Response(JSON.stringify({
            message: 'Ihre Nachricht wurde erfolgreich gesendet.'
        }), { status: 200 });

    } catch (error) {
        console.error('Error in contact form:', error);
        return new Response(JSON.stringify({
            message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
        }), { status: 500 });
    }
};
