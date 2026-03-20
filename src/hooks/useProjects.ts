import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    images?: string[];
    tech: string[];
    github: string;
    live?: string;
    featured: boolean;
    created_at?: string;
}

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
                const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Project[];
                setProjects(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [refreshKey]);

    return { projects, loading, error, refresh };
}
