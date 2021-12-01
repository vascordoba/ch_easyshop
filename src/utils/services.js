//local file services
//import services from "./files";

//cloud firebase services
import services from "./firebase";

const getProducts = async () => {
  return await services.getProducts();
};

const getProduct = async (id) => {
  return await services.getProduct(id);
};

const getBrands = async () => {
  return await services.getBrands();
};

const getCategories = async () => {
  return await services.getCategories();
};

export { getProducts, getProduct, getBrands, getCategories };
