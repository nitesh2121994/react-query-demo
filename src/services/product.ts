import { Category, PriceRange } from './../types/Product';
import axios from "axios";
import { Product } from "types/Product";


export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const model = {
    ...product,
    categoryId: product.category?.value,
    subCategoryId: product.subCategory?.value
  }
  const response = await axios.post(
    "http://localhost:3000/products",
    {...model, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
  );
  return response.data;
};


export const getPriceRanges = async (): Promise<PriceRange[]> => {
  const response = await axios.get("http://localhost:3000/priceranges");
  return response.data;
};

export const getCategory = async (): Promise<Category[]> => {
  const response = await axios.get("http://localhost:3000/categories");
  return response.data;
};


export const getSubCategories = async (categoryId: number | null): Promise<Category[]> => {
  const response = await axios.get(`http://localhost:3000/subcategories?parentId=${categoryId}`);
  return response.data;
};
