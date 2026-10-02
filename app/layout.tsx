import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

// Inlined at build time; empty for a root site, "/<repo>" on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "BAC Mentor AI | مدرّس التاريخ الذكي",
  description:
    "منصة مجانية لمراجعة تاريخ وجغرافيا البكالوريا — دروس، مصطلحات، شخصيات، تواريخ، خرائط، وتصحيح وزاري فوري، يعمل دون اتصال.",
  manifest: `${basePath}/manifest.json`,
  // Next does not prefix basePath onto metadata URLs, so it is added here.
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "48x48" },
      { url: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icon.svg`, type: "image/svg+xml", sizes: "any" },
    ],
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F5132",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("bac-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-[#FBFBFA] text-zinc-900 antialiased dark:bg-[#0F1115] dark:text-zinc-100">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
