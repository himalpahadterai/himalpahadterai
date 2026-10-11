import { Product, SiteSettings, Category } from '../types';

export function getOrganizationSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.companyName,
    description: settings.businessDescription,
    telephone: settings.phone,
    email: settings.email,
    url: settings.canonicalBaseUrl,
    logo: `${settings.canonicalBaseUrl}${settings.logoUrl}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.regAddress,
      addressLocality: 'Mahottari',
      addressRegion: 'Madhesh Province',
      postalCode: '45700',
      addressCountry: 'NP',
    },
    branchOf: {
      '@type': 'Organization',
      name: settings.companyName,
      location: {
        '@type': 'Place',
        name: 'Bardibas Branch',
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.branchAddress,
          addressLocality: 'Bardibas',
          addressRegion: 'Mahottari',
          addressCountry: 'NP',
        },
      },
    },
    priceRange: 'NPR',
  };
}

export function getProductSchema(product: Product, settings: SiteSettings) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: settings.companyName,
    },
    url: `${settings.canonicalBaseUrl}/machines/${product.slug}`,
  };

  if (product.priceType === 'fixed' && product.price && !isNaN(Number(product.price))) {
    schema.offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'NPR',
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      url: `${settings.canonicalBaseUrl}/machines/${product.slug}`,
    };
  }

  return schema;
}

export function getBreadcrumbSchema(items: { name: string; url: string }[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
