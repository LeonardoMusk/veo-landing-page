import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | VEO",
  },
  description: siteConfig.description,
  applicationName: "VEO",
  category: "Salud y bienestar",
  keywords: [
    "ecografía hiperrealista",
    "ecografía 5D hiperrealista",
    "ecografía 5D",
    "retrato hiperrealista bebé",
    "imagen bebé antes de nacer",
    "experiencia prenatal",
    "servicio para clínicas de ecografía",
    "ecografía hiperrealista Argentina",
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "VEO", url: "/" }],
  creator: "VEO",
  publisher: "VEO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon-veo.png", type: "image/png", sizes: "64x64" }],
    shortcut: "/favicon-veo.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "VEO | Ecografías hiperrealistas",
    description:
      "La ilusión de conocer su rostro antes de nacer. Una experiencia creada a partir de una ecografía 5D.",
    type: "website",
    url: "/",
    siteName: "VEO",
    locale: siteConfig.locale,
    images: [
      {
        url: "/og-veo.webp",
        width: 1200,
        height: 630,
        alt: "VEO · Ecografías hiperrealistas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VEO | Ecografías hiperrealistas",
    description: "La ilusión de conocer su rostro antes de nacer.",
    images: ["/og-veo.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VEO · Ecografías hiperrealistas",
    serviceType: "Creación de imágenes hiperrealistas a partir de ecografías 5D",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/og-veo.webp`,
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    audience: [
      { "@type": "Audience", audienceType: "Clínicas y centros de diagnóstico por imágenes" },
      { "@type": "Audience", audienceType: "Madres, padres y familias" },
    ],
    provider: {
      "@type": "Organization",
      name: "VEO",
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo-veo-principal.webp`,
    },
  };

  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.setAttribute('data-theme',localStorage.getItem('veo-theme')==='dark'?'dark':'light')}catch(e){}` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
