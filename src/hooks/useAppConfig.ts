import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface AppConfig {
    key: string;
    value: string;
    description?: string;
}

export function useAppConfig() {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const snapshot = await getDocs(collection(db, 'app_config'));
                const configMap: Record<string, string> = {};
                snapshot.docs.forEach(d => {
                    const data = d.data() as AppConfig;
                    configMap[data.key] = data.value;
                });
                setConfig(configMap);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch config');
                console.error('Error fetching config:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchConfig();
    }, []);

    const getConfig = (key: string, defaultValue = '') => config[key] ?? defaultValue;
    return { config, getConfig, loading, error };
}
