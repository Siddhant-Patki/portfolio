import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { supabase } from '../lib/supabase';
import { app } from '../index';

vi.mock('../lib/supabase', () => ({
  supabase: { from: vi.fn() },
}));

vi.mock('dotenv/config', () => ({}));

describe('GET /api/projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with project array on success', async () => {
    const mockProjects = [
      {
        id: 'test-project',
        title: 'Test',
        tagline: 'A test project',
        description: 'desc',
        problem: 'prob',
        solution: 'sol',
        impact: 'imp',
        tech: ['React'],
        links: {},
        featured: false,
        sort_order: 1,
      },
    ];

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: mockProjects, error: null }),
      }),
    } as never);

    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({ id: 'test-project' });
  });

  it('returns 500 when Supabase errors', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: null, error: new Error('DB error') }),
      }),
    } as never);

    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(500);
  });
});
