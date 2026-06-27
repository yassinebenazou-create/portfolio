import { useState, useEffect } from 'react';
import { profile as localProfile, type ProfileData } from '@/data/profile';

export interface Profile extends ProfileData {}

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const storedProfile = typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-profile') : null;
                const resolvedProfile = storedProfile ? JSON.parse(storedProfile) : localProfile;
                setProfile(resolvedProfile as Profile);
                setError(null);
            } catch (err) {
                setProfile(localProfile as Profile);
                setError(err instanceof Error ? err.message : 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    return { profile, loading, error };
}
