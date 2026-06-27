import { useState, useEffect } from 'react';
import { appConfig as localConfig, type AppConfigData } from '@/data/config';

export interface AppConfig extends AppConfigData {}

export function useAppConfig() {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const configMap: Record<string, string> = {};
                localConfig.forEach((item) => {
                    configMap[item.key] = item.value;
                });
                setConfig(configMap);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch config');
            } finally {
                setLoading(false);
            }
        }
        fetchConfig();
    }, []);

    const getConfig = (key: string, defaultValue = '') => config[key] ?? defaultValue;
    return { config, getConfig, loading, error };
}
