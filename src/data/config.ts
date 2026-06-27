export interface AppConfigData {
  key: string;
  value: string;
  description?: string;
}

export const appConfig: AppConfigData[] = [
  {
    key: 'analytics_embed_url',
    value: '',
    description: 'Looker Studio embed URL',
  },
];
