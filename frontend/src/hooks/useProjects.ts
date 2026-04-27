import { useEffect, useState } from 'react';
import { PROJECTS, type Project } from '@constants/projects';

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const API_URL = import.meta.env['VITE_API_URL'] as string | undefined;

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(!!API_URL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_URL) return;

    fetch(`${API_URL}/api/projects`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Project[];
        setProjects(data);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load projects';
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { projects, loading, error };
}
