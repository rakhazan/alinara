export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  stock: number;
  description: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  href?: string;
  colors: { name: string; value: string }[];
};
