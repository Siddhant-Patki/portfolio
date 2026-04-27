import { Router } from 'express';
import { ZodError } from 'zod';
import { contactSchema } from '../schemas/contact';
import { supabase } from '../lib/supabase';
import { transporter } from '../lib/mailer';

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(422).json({ error: 'Validation failed', details: parsed.error.flatten() });
      return;
    }

    const { name, email, message } = parsed.data;

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, message });

    if (dbError) throw dbError;

    await transporter.sendMail({
      from: process.env['SMTP_FROM'],
      to: process.env['CONTACT_EMAIL'],
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    res.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).json({ error: 'Validation failed' });
      return;
    }
    next(err);
  }
});
