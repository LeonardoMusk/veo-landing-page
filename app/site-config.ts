const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const resolvedUrl =
  configuredUrl ||
  (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000");

export const siteConfig = {
  name: "VEO",
  title: "VEO | Ecografías hiperrealistas a partir de ecografías 5D",
  description:
    "VEO transforma ecografías 5D en imágenes hiperrealistas del bebé. Una experiencia emocional para familias y un servicio diferencial para clínicas.",
  url: resolvedUrl.replace(/\/$/, ""),
  locale: "es_AR",
  country: "Argentina",
};
