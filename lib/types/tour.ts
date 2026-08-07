export type Tour = {
  id: number;
  slug: string;
  title: string;

  category: string;
  location: string;
  duration: string;
  difficulty: string;

  languages: string[];
  transportationIncluded: boolean;
  mealsIncluded: boolean;

  priceAdult: number;
  priceChild: number;

  featured: boolean;
  active: boolean;

  rating: number;
  reviews: number;

  image: string;
  gallery: string[];

  shortDescription: string;
  description: string;

  includes: string[];
  whatToBring: string[];

  createdAt?: string;
  updatedAt?: string;
};