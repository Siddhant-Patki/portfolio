import { Router } from 'express';
import { ZodError } from 'zod';
import { contactSchema } from '../schemas/contact';
import { supabase } from '../lib/supabase';
import { sendContactEmail } from '../lib/mailer';

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

    await sendContactEmail(name, email, message);

    res.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).json({ error: 'Validation failed' });
      return;
    }
    next(err);
  }
});
