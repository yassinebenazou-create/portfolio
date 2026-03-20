import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Skill {
    id: string;
    name: string;
    icon?: string;
}

export function useSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => setRefreshKey(k => k + 1);

    useEffect(() => {
        setLoading(true);
        async function fetchSkills() {
            try {
                const q = query(collection(db, 'skills'), orderBy('name', 'asc'));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Skill[];
                setSkills(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch skills');
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, [refreshKey]);

    return { skills, loading, error, refresh };
}
