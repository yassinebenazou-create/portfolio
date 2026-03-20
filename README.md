# Portfolio

A personal portfolio website built with React, Firebase, and Tailwind CSS. Features a dynamic admin dashboard to manage projects, skills, and profile content in real time.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** + **shadcn/ui** — styling and components
- **Firebase** — Firestore (database), Auth (Google OAuth)
- **Framer Motion** — animations
- **EmailJS** — contact form
- **Cloudflare Pages** — hosting

## Features

- Responsive portfolio with hero, about, skills, projects, and contact sections
- Admin dashboard at `/razer` (Google OAuth, email whitelist)
- Manage projects, skills, and profile from the dashboard
- Analytics via Google Looker Studio embed
- Dark/light theme toggle

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file based on `.env.example` and fill in your Firebase credentials.

## Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_ADMIN_EMAILS=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_ANALYTICS_EMBED_URL=
```

## Deployment

Hosted on **Cloudflare Pages**.

- Build command: `npm run build`
- Output directory: `dist`

## License

MIT

