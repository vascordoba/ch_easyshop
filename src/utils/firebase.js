import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import fileProds from "../assets/files/products.json";

import { query, collection, doc, addDoc, getDocs, getDoc, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH_I8qqPcjspn1ur0y9aHqlhKX2AaxnE0",
  authDomain: "ch-easyshop-app.firebaseapp.com",
  projectId: "ch-easyshop-app",
  storageBucket: "ch-easyshop-app.appspot.com",
  messagingSenderId: "66465471854",
  appId: "1:66465471854:web:f7ac4fecaf0aee50f0b57f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadProductsIfEmpty = async () => {
  const prods = await getProducts();
  if (!prods || prods.length === 0) {
    fileProds.map(async (fileProd) => {
      await addDoc(collection(db, "products"), fileProd);
    });
  }
};

const getProducts = async (category, brands) => {
  let col = collection(db, "products");
  //query
  let w = [],
    q;
  if (category) {
    w.push(where("category", "==", category));
  }
  if (brands && brands.lenght > 0) {
    w.push(where("brand", "in", brands));
  }
  if (w && w.length > 0) {
    q = query(col, ...w);
  } else {
    q = query(col);
  }

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const getProduct = async (id) => {
  const q = doc(db, "products", id);
  const docSnapshot = await getDoc(q);
  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  } else {
    return {};
  }
};

const getBrands = async () => {
  const q = query(collection(db, "brands"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const getCategories = async () => {
  const q = query(collection(db, "categories"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const createUser = async (user) => {
  const userId = addDoc(collection(db, "users"), user);
  return userId;
};

const getUser = async (email) => {
  const col = collection(db, "users");
  let q = query(col, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

const createOrder = async (order) => {
  const orderId = addDoc(collection(db, "orders"), order);
  return orderId;
};

const getOrders = async (userId) => {
  let q = query(collection(db, "orders"), where("buyer", "==", userId));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

//se ejecuta una sola vez para cargar los productos masivamente
loadProductsIfEmpty();

const services = { getProducts, getProduct, getBrands, getCategories, createUser, getUser, createOrder, getOrders };

export default services;
