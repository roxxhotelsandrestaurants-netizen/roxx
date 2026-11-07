import type { ReactNode } from "react";

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M4 12h16m-7-7 7 7-7 7" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="m7 3 3 5-3 3a16 16 0 0 0 6 6l3-3 5 3c-1 4-3 5-6 4C8 19 5 16 3 9 2 6 3 4 7 3Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    leaf: <path d="M20 3C9 2 2 7 5 15c8 6 16-1 15-12ZM3 21 15 9" />,
    utensils: <path d="M5 3v6c0 4 6 4 6 0V3M8 3v18M20 21V3c-5 1-5 10 0 10" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    bed: <path d="M3 18v3M21 18v3M3 10V5h18v5M2 18v-5c0-2 2-3 4-3h12c2 0 4 1 4 3v5ZM6 10V7h4v3M14 10V7h4v3" />,
    spark: <path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    check: <path d="m5 12 4 4L19 6" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2" /></>,
    cake: <><path d="M3 21h18M4 21V11h16v10M4 15c3 4 5-4 8 0s5-4 8 0M8 11V7M16 11V7M12 11V5M8 4v1M16 4v1M12 2v1" /></>,
    rings: <><circle cx="8" cy="14" r="6" /><circle cx="16" cy="14" r="6" /><path d="m10 3 2 4 2-4-2-2Z" /></>,
    copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    whatsapp: <><path d="M20.7 11.5a8.7 8.7 0 0 1-12.9 7.7L3 20.5l1.3-4.6A8.7 8.7 0 1 1 20.7 11.5Z" /><path d="m8 7.3 1.3 2.6-1 1.1a8.2 8.2 0 0 0 4.2 4.1l1.1-1.3 2.5 1.2c-.2 1.9-1.7 2.2-3.3 1.7-3.9-1.3-6.1-3.6-7-6.9-.4-1.4.2-2.5 2.2-2.5Z" strokeWidth="1.2" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}
