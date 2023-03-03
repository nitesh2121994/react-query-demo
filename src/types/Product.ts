export type Category = {
  value: number;
  label: string;
};

export type PriceRange = Category;

export type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  category: Category | null;
  subCategory: Category | null;
  priceRange: Category | null;
};
