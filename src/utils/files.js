import { get, post } from "./rest";

const getProducts = async () => {
  const url = "/assets/files/products.json";
  return await get(url);
};

const getProduct = async (id) => {
  const url = "/assets/files/products.json";
  const result = await get(url);
  return result.filter((res) => res.id === parseInt(id));
};

const getBrands = async () => {
  const url = "/assets/files/brands.json";
  return await get(url);
};

const getCategories = async () => {
  const url = "/assets/files/categories.json";
  return await get(url);
};

const services = { getProducts, getProduct, getBrands, getCategories };
export default services;
