import { venue } from "./content";
import { SITE_NAME, SITE_URL } from "./site";

export const programCourseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "6-тижнева програма Forge Future",
  description:
    "Альтернатива школі: інтенсив від ідеї до демо-дня для амбітної молоді. Мала група, власний проєкт.",
  url: `${SITE_URL}/program`,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  courseMode: "onsite",
  inLanguage: "uk",
  educationalLevel: "підлітки",
  timeRequired: "P6W",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Підлітки, амбітна молодь",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "1000",
    highPrice: "2000",
    offerCount: 3,
    priceCurrency: "USD",
    availability: "https://schema.org/LimitedAvailability",
    url: `${SITE_URL}/program`,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      name: venue.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: venue.city,
        addressCountry: "UA",
      },
    },
  },
};
