import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Profile {
    id?: string;
    full_name: string;
    role: string;
    bio: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    resume_url?: string;
    avatar_url?: string;
    created_at?: string;
    updated_at?: string;
}

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const docRef = doc(db, 'profile', 'main');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile({ id: docSnap.id, ...docSnap.data() } as Profile);
                } else {
                    setProfile(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch profile');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    return { profile, loading, error };
}
