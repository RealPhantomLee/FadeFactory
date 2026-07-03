export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fade Factory",
    "image": "https://example.com/images/StoreImage.jpg", // Replace with actual URL
    "description": "Elevated grooming and barbershop services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Barber St",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "telephone": "+15555555555",
    "url": "https://example.com", // Replace with actual URL
    "openingHours": "Mo-Su 09:00-19:00"
  };
}
