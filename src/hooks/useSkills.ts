import { useState, useEffect } from 'react';
import { skills as localSkills, type SkillData } from '@/data/skills';

export interface Skill extends SkillData {}

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
                const storedSkills = typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-skills') : null;
                const sourceSkills = storedSkills ? JSON.parse(storedSkills) : localSkills;
                const data = [...sourceSkills].sort((a: Skill, b: Skill) => a.name.localeCompare(b.name)) as Skill[];
                setSkills(data);
                setError(null);
            } catch (err) {
                const data = [...localSkills].sort((a, b) => a.name.localeCompare(b.name)) as Skill[];
                setSkills(data);
                setError(err instanceof Error ? err.message : 'Failed to fetch skills');
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, [refreshKey]);

    return { skills, loading, error, refresh };
}
