import { Router } from 'express';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';

export const projectsRouter = Router();

projectsRouter.get('/', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    res.json(data as Project[]);
  } catch (err) {
    next(err);
  }
});
