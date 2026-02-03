// Structured Data Generators for SEO

export interface BusinessInfo {
  name: string;
  alternateName: string;
  description: string;
  url: string;
  telephone: string[];
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  areasServed: string[];
  foundingDate: string;
  founder: {
    name: string;
    jobTitle: string;
    qualification: string;
  };
}

export const businessInfo: BusinessInfo = {
  name: 'ZDentistry - Best Dental Clinic in Cuttack | Dentist Near You',
  alternateName: 'ZDentistry Cuttack, Best Dentist CDA Cuttack',
  description: 'Looking for the best dentist in Cuttack? ZDentistry is the #1 rated dental clinic in CDA Sector-9, Cuttack. Expert dental care including dental implants, cosmetic dentistry, emergency dental & maxillofacial surgery by Dr. Zuben Mohanty (MDS). Top 5 best dentist in Cuttack. Call +91 89844 89929.',
  url: 'https://zdentistry.in',
  telephone: ['+918984489929', '+918984469929'],
  email: 'contact@zdentistry.in',
  address: {
    streetAddress: '2B / 109, Near Jugal Kishore Park, CDA Sector-9',
    addressLocality: 'Cuttack',
    addressRegion: 'Odisha',
    postalCode: '753014',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 20.4625,
    longitude: 85.8830,
  },
  openingHours: [
    'Mo-Sa 10:00-14:00',
    'Mo-Sa 17:00-21:00',
    'Su 10:00-14:00',
  ],
  priceRange: '$$',
  // Areas served - important for "near me" searches
  areasServed: [
    'Cuttack',
    'Bhubaneswar',
    'CDA Sector 9',
    'CDA Sector 6',
    'CDA Sector 7',
    'CDA Sector 8',
    'CDA Sector 10',
    'CDA Cuttack',
    'Bidanasi',
    'Madhupatna',
    'Buxi Bazaar',
    'College Square',
    'Ranihat',
    'Chauliaganj',
    'Jobra',
    'Tulsipur',
    'Cantonment Road',
    'Khan Nagar',
    'Malgodown',
    'Shelter Chhak',
    'Link Road Cuttack',
    'Odisha',
  ],
  foundingDate: '2020',
  founder: {
    name: 'Dr. Zuben Mohanty',
    jobTitle: 'Oral & Maxillofacial Surgeon',
    qualification: 'M.D.S. in Oral & Maxillofacial Surgery',
  },
};

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
    '@id': `${businessInfo.url}/#organization`,
    name: businessInfo.name,
    alternateName: businessInfo.alternateName,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone[0],
    image: [
      `${businessInfo.url}/images/clinic-1.png`,
      `${businessInfo.url}/images/clinic-2.png`,
      `${businessInfo.url}/logo.svg`,
    ],
    logo: `${businessInfo.url}/logo.svg`,
    priceRange: businessInfo.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    // Areas served - crucial for "near me" searches
    areaServed: businessInfo.areasServed.map(area => ({
      '@type': 'City',
      name: area,
    })),
    // Service area radius
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: businessInfo.geo.latitude,
        longitude: businessInfo.geo.longitude,
      },
      geoRadius: '50000', // 50km radius
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '17:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: businessInfo.telephone[0],
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Odia'],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        telephone: businessInfo.telephone[1],
        contactType: 'appointments',
        availableLanguage: ['English', 'Hindi', 'Odia'],
        areaServed: 'IN',
      },
    ],
    founder: {
      '@type': 'Person',
      name: businessInfo.founder.name,
      jobTitle: businessInfo.founder.jobTitle,
      qualification: businessInfo.founder.qualification,
    },
    employee: {
      '@type': 'Person',
      name: businessInfo.founder.name,
      jobTitle: businessInfo.founder.jobTitle,
      qualification: businessInfo.founder.qualification,
    },
    foundingDate: businessInfo.foundingDate,
    sameAs: [
      // Add social media URLs here when available
      // 'https://www.facebook.com/zdentistry',
      // 'https://www.instagram.com/zdentistry',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services in Cuttack',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dental Check-up and Clean',
            description: 'Comprehensive dental examination and professional cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dental Implants',
            description: 'Permanent tooth replacement with dental implants',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cosmetic Dentistry',
            description: 'Teeth whitening, veneers, and smile makeovers',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Dental Care',
            description: '24/7 emergency dental services in Cuttack',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maxillofacial Surgery',
            description: 'Oral and maxillofacial surgery by specialist surgeon',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Root Canal Treatment',
            description: 'Painless root canal treatment',
          },
        },
      ],
    },
    // Keywords for search engines - targeting top search terms
    keywords: 'dentist near me, dental clinic near me, best dental clinic in cuttack, best dentist in cuttack, dental clinic cuttack, best dentist in cda cuttack, 5 best dentist in cuttack, top dentist cuttack, dental implants Cuttack, maxillofacial surgeon Cuttack, emergency dentist Cuttack',
    // Additional names for search
    additionalType: 'http://www.productontology.org/id/Dentistry',
    slogan: 'Best Dental Clinic in Cuttack - Your Trusted Dentist Near You',
  };
}

// Generate combined Reviews with AggregateRating schema
// Google requires aggregateRating when multiple reviews are present
export function generateReviewsWithRatingSchema(reviews: { author: string; text: string; rating?: number; date?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${businessInfo.url}/#dentist-reviews`,
    name: businessInfo.name,
    image: `${businessInfo.url}/logo.svg`,
    url: businessInfo.url,
    // AggregateRating is required when showing multiple reviews
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '50',
      reviewCount: reviews.length.toString(),
    },
    // Individual reviews
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating || 5,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
      datePublished: review.date || '2024-01-01',
    })),
  };
}

// Keep for backwards compatibility - now just returns null
export function generateAggregateRatingSchema() {
  return null;
}

// Keep for backwards compatibility - now just returns null
export function generateReviewSchema(reviews: { author: string; text: string; rating?: number }[]) {
  return null;
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ZDentistry',
      url: businessInfo.url,
    },
    provider: {
      '@id': `${businessInfo.url}/#organization`,
    },
  };
}

export function generateMedicalWebPageSchema(
  title: string,
  description: string,
  url: string,
  medicalCondition?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description: description,
    url: url,
    lastReviewed: new Date().toISOString().split('T')[0],
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    ...(medicalCondition && {
      about: {
        '@type': 'MedicalCondition',
        name: medicalCondition,
      },
    }),
    provider: {
      '@id': `${businessInfo.url}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
