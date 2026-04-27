import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { supabase } from '../lib/supabase';
import { transporter } from '../lib/mailer';
import { app } from '../index';

vi.mock('../lib/supabase', () => ({
  supabase: { from: vi.fn() },
}));

vi.mock('../lib/mailer', () => ({
  transporter: { sendMail: vi.fn() },
}));

vi.mock('dotenv/config', () => ({}));

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message that is long enough.',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: null }),
    } as never);
    vi.mocked(transporter.sendMail).mockResolvedValue({} as never);
  });

  it('returns 200 on valid submission', async () => {
    const res = await request(app).post('/api/contact').send(validBody);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: true });
  });

  it('returns 422 when name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ email: 'test@example.com', message: 'long enough message here' });
    expect(res.status).toBe(422);
  });

  it('returns 422 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'not-an-email', message: 'long enough message here' });
    expect(res.status).toBe(422);
  });

  it('returns 422 when message is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'test@example.com', message: 'short' });
    expect(res.status).toBe(422);
  });

  it('saves to DB and sends email on valid submission', async () => {
    await request(app).post('/api/contact').send(validBody);
    expect(supabase.from).toHaveBeenCalledWith('contact_submissions');
    expect(transporter.sendMail).toHaveBeenCalledOnce();
  });
});
