# Shanto Joseph — Portfolio

Personal portfolio website built with React + Firebase. Features a live admin dashboard to manage content in real time.

🌐 **Live:** [shantojoseph.com](https://shantojoseph.com)

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **Firebase** — Firestore + Google Auth
- **Framer Motion** — animations
- **Three.js** + **Vanta.js** — hero background
- **goey-toast** — notifications
- **EmailJS** — contact form
- **Cloudflare Pages** — hosting

## Features

- Responsive sections: Hero, About, Skills, Projects, Contact
- Admin dashboard at `/razer` — manage projects, skills, profile via Firestore
- Google OAuth with email whitelist
- Analytics embed (Google Looker Studio)
- Theme color picker + dark mode
- SEO: JSON-LD schema, Open Graph, sitemap, canonical tags
- Performance: lazy-loaded routes, code splitting, 5min query cache

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in your credentials.

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
VITE_THEME_MODE=
```

## Deployment

Hosted on **Cloudflare Pages** with automatic deployments from `main`.

- Build command: `npm run build`
- Output directory: `dist`

## License

MIT
