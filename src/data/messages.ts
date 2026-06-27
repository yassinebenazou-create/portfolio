export interface MessageData {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at?: string;
}

export const messages: MessageData[] = [
  {
    id: 'message-1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    message: 'Hello! I would love to discuss a web app project for my team.',
    status: 'new',
    created_at: '2024-10-12T09:30:00.000Z',
  },
  {
    id: 'message-2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    message: 'I saw your portfolio and wanted to explore collaboration opportunities.',
    status: 'read',
    created_at: '2024-09-28T15:10:00.000Z',
  },
];
