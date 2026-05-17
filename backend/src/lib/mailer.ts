import { Resend } from 'resend';

let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) resend = new Resend(process.env['RESEND_API_KEY']);
  return resend;
}

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const { error } = await getResend().emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: process.env['CONTACT_EMAIL'] ?? '',
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  });

  if (error) throw new Error(error.message);
}
