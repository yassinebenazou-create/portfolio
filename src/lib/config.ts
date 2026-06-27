/**
 * Central config for all hardcoded fallback values.
 * These are used when profile data is unavailable.
 */
export const DEFAULT_PROFILE = {
  full_name: "Yassine Benazzou",
  first_name: "Yassine",
  last_name: "Benazzou",
  role: "Full-Stack Web Developer • Freelance & Remote Contracts",
  email: "yassine.benazzou@gmail.com",
  bio: "Results-driven Full-Stack Web Developer with hands-on experience building responsive, high-performance web applications using React, PHP, Node.js, and MySQL. Available for remote freelance and contract engagements.",
  github: "https://github.com/yassinebenazou-create",
  linkedin: "https://www.linkedin.com/in/yassine-benazzou-4956b4384/",
  resume_url: new URL('../assets/Yassine_Benazzou_CV.docx', import.meta.url).href,
  location: "Casablanca / El Jadida, Morocco",
} as const;

export const SITE = {
  url: "https://yassinebenazzou.com",
  title: "Yassine Benazzou | Full-Stack Web Developer",
  description: "Full-Stack Web Developer building responsive web applications with React, PHP, Node.js, and MySQL.",
  ogImage: "https://yassinebenazzou.com/favicon.svg",
} as const;
