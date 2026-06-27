export interface ProjectData {
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

export const projects: ProjectData[] = [
  {
    id: 'project-1',
    title: 'Personal Portfolio Website',
    description: 'Built a fully responsive multi-page portfolio from scratch using HTML5, CSS3, and vanilla JavaScript, with clean UI/UX principles and intuitive navigation across mobile, tablet, and desktop.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/yassinebenazzou',
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'project-2',
    title: 'Dynamic Web Application (PHP + MySQL)',
    description: 'Developed a full CRUD web application with user authentication and session management using PHP and MySQL, and deployed it locally via XAMPP.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    ],
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/yassinebenazzou',
    featured: true,
    created_at: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'project-3',
    title: 'React Component Library',
    description: 'Building a reusable library of React components such as forms, modals, and navbars with a focus on component architecture, state management, and scalability.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
    tech: ['React', 'JavaScript', 'React Hooks'],
    github: 'https://github.com/yassinebenazzou',
    featured: false,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'project-4',
    title: 'Lux Time Cars Rental Website',
    description: 'Designed a modern car rental landing page for Lux Time Cars, showcasing the Casablanca fleet, services, contact CTA, and fast booking experience for local customers.',
    image: new URL('../assets/carsrent.png', import.meta.url).href,
    images: [
      new URL('../assets/carsrent.png', import.meta.url).href,
    ],
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/yassinebenazou-create',
    featured: true,
    created_at: '2024-06-27T00:00:00.000Z',
  },
  {
    id: 'project-5',
    title: 'Custom Car Diagnostic Landing Page',
    description: 'Created a sleek automotive diagnostic landing page for Custom Car, highlighting advanced electronic scanning, Range Rover vehicle visuals, and a polished service interface for pre-intervention technical decisions.',
    image: new URL('../assets/custom.png', import.meta.url).href,
    images: [
      new URL('../assets/custom.png', import.meta.url).href,
    ],
    tech: ['React', 'Tailwind CSS', 'UI Design'],
    github: 'https://github.com/yassinebenazzou-create',
    featured: true,
    created_at: '2024-06-27T00:00:00.000Z',
  },
];
