/**
 * Central config for all hardcoded fallback values.
 * These are used when Firebase profile data is unavailable.
 */
export const DEFAULT_PROFILE = {
  full_name: "Shanto Joseph",
  first_name: "Shanto",
  last_name: "Joseph",
  role: "Full-Stack Developer",
  email: "shantojoseph23@gmail.com",
  bio: "Turning ideas into interactive, dynamic, and scalable digital experiences.",
  github: "https://github.com/shanto-joseph",
  linkedin: "https://www.linkedin.com/in/shanto-joseph",
  resume_url: "https://rxresu.me/shantojoseph23/resume",
  location: "Ernakulam, India",
} as const;

export const SITE = {
  url: "https://shantojoseph.com",
  title: "Shanto Joseph | Full-Stack Developer",
  description: "Full-Stack Developer building innovative web applications with React, Python, Java, and AI/ML.",
  ogImage: "https://res.cloudinary.com/dk6i1ld2q/image/upload/v1763925337/s_3_kq7f8b.svg",
} as const;
