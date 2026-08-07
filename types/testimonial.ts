export type Testimonial = {
  id: number;
  name: string;
  country: string;
  tour: string;
  tourSlug: string | null;
  comment: string;
  rating: number;
  featured: boolean;
  active: boolean;
  displayOrder: number;
};