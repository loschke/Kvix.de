import type { APIRoute } from 'astro';
import { sendEmail, createNewsletterConfirmationEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const email = formData.get('email')?.toString();

        // Validierung
        if (!email) {
            return new Response(JSON.stringify({
                message: 'Email-Adresse ist erforderlich.'
            }), { status: 400 });
        }

        // Email-Format validieren
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({
                message: 'Ungültige Email-Adresse.'
            }), { status: 400 });
        }

        // TODO: Hier könnte man die Email-Adresse in einer Datenbank speichern

        // Bestätigungsemail an den Abonnenten senden
        const { text, html } = createNewsletterConfirmationEmail(email);
        const subscriberResult = await sendEmail({
            to: email,
            subject: 'Newsletter-Anmeldung bestätigt',
            text,
            html
        });

        if (!subscriberResult.success) {
            throw new Error(subscriberResult.error);
        }

        // Benachrichtigung an den Seitenbetreiber senden
        const notificationResult = await sendEmail({
            to: import.meta.env.CONTACT_EMAIL,
            subject: 'Neue Newsletter-Anmeldung',
            text: `Neue Newsletter-Anmeldung von: ${email}`,
            html: `<h2>Neue Newsletter-Anmeldung</h2><p>Email-Adresse: ${email}</p>`
        });

        if (!notificationResult.success) {
            console.error('Failed to send admin notification:', notificationResult.error);
            // We don't throw here as the subscriber notification was successful
        }

        return new Response(JSON.stringify({
            message: 'Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigungsemail.'
        }), { status: 200 });

    } catch (error) {
        console.error('Error in newsletter signup:', error);
        return new Response(JSON.stringify({
            message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
        }), { status: 500 });
    }
};
