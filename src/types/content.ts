export interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export interface SiteContent {
  siteTitle: string;
  siteDescription: string;
  logo: string;
  businessName: string;
  tagline: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  homepageText: string;
  about: {
    title: string;
    text: string;
    image: string;
  };
  services: ServiceItem[];
  process: ProcessStep[];
  pricingText: string;
  testimonials: TestimonialItem[];
}

export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
}

export interface GalleryImage {
  src: string;
  name: string;
  width: number;
  height: number;
}
