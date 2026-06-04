import { TELEGRAM_IVAN_CHANNEL_URL } from "./telegram";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Іван",
    jobTitle: "Засновник Forge Future",
  },
  sameAs: [
    "https://pervoy.com",
    "https://www.linkedin.com/in/ivan-pervoy/",
    "https://t.me/ivanpervoy_bot",
    TELEGRAM_IVAN_CHANNEL_URL,
  ],
  areaServed: { "@type": "Country", name: "Ukraine" },
  alternateName: "Школа майбутніх Діамантів",
  knowsAbout: [
    "Школа майбутніх Діамантів",
    "Неошкола",
    "альтернативне навчання",
    "власна стратегія життя",
    "власні проєкти для підлітків",
    "менторство",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "uk",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};
