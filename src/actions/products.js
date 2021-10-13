import axios from "axios";

export const createProduct = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products`);

export const sellerProducts = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProduct = async (token, productId) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/delete-product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const read = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${productId}`);

export const updateProduct = async (token, data, productId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-product/${productId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const userProductPurchase = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-product-purchase`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const isAllreadyPurchased = async (token, productId) =>
  await axios.get(
    `${process.env.REACT_APP_API}/is-already-purchased/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
