import { useState, useEffect } from 'react';
import { projects as localProjects, type ProjectData } from '@/data/projects';

export interface Project extends ProjectData {}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => setRefreshKey(k => k + 1);

    useEffect(() => {
        setLoading(true);
        async function fetchProjects() {
            try {
                const storedProjects = typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-projects') : null;
                const sourceProjects = storedProjects ? JSON.parse(storedProjects) : localProjects;
                const data = [...sourceProjects].sort((a: Project, b: Project) => (b.created_at || '').localeCompare(a.created_at || '')) as Project[];
                setProjects(data);
                setError(null);
            } catch (err) {
                const data = [...localProjects].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')) as Project[];
                setProjects(data);
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [refreshKey]);

    return { projects, loading, error, refresh };
}
