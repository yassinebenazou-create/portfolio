import { useEffect } from "react";
import { SITE } from "@/lib/config";

interface PageMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  url?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, ogImage, url }: PageMeta) {
  useEffect(() => {
    const t = title || SITE.title;
    const d = description || SITE.description;
    const img = ogImage || SITE.ogImage;
    const u = url || SITE.url;

    document.title = t;

    setMeta("title", t);
    setMeta("description", d);

    setMeta("og:title", t, "property");
    setMeta("og:description", d, "property");
    setMeta("og:image", img, "property");
    setMeta("og:url", u, "property");

    setMeta("twitter:title", t);
    setMeta("twitter:description", d);
    setMeta("twitter:image", img);
    setMeta("twitter:url", u);

    // Reset to defaults on unmount
    return () => {
      document.title = SITE.title;
      setMeta("title", SITE.title);
      setMeta("description", SITE.description);
      setMeta("og:title", SITE.title, "property");
      setMeta("og:description", SITE.description, "property");
      setMeta("og:image", SITE.ogImage, "property");
      setMeta("og:url", SITE.url, "property");
      setMeta("twitter:title", SITE.title);
      setMeta("twitter:description", SITE.description);
      setMeta("twitter:image", SITE.ogImage);
      setMeta("twitter:url", SITE.url);
    };
  }, [title, description, ogImage, url]);
}
