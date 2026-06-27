export interface ProfileData {
  id: string;
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

export const profile: ProfileData = {
  id: 'main',
  full_name: 'Yassine Benazzou',
  role: 'Full-Stack Web Developer • Freelance & Remote Contracts',
  bio: 'Results-driven Full-Stack Web Developer with hands-on experience building responsive, high-performance web applications using React, PHP, Node.js, and MySQL. Available for remote freelance and contract engagements.',
  email: 'yassine.benazzou@gmail.com',
  github: 'https://github.com/yassinebenazou-create',
  linkedin: 'https://www.linkedin.com/in/yassine-benazzou-4956b4384/',
  twitter: '',
  instagram: '',
  resume_url: '',
  avatar_url: '',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};
