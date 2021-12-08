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

const createUser = async (user) => {
  return await services.createUser(user);
};

const getUser = async (email) => {
  return await services.getUser(email);
};

const createOrder = async (order) => {
  return await services.createOrder(order);
};

const getOrders = async (userId) => {
  return await services.getOrders(userId);
};

export { getProducts, getProduct, getBrands, getCategories, createUser, getUser, createOrder, getOrders };
