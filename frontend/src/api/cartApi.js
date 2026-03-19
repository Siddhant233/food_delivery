import axiosClient from "./axiosClient";

// GET /api/cart/{cartId} — get all cart items for a cart
export const getCart = (cartId) =>
  axiosClient.get(`/cart/${cartId}`);

// POST /api/cart/add?menuItemId={id}&quantity={qty} — add item to cart
export const addToCart = (cartBody, menuItemId, quantity) =>
  axiosClient.post(`/cart/add?menuItemId=${menuItemId}&quantity=${quantity}`, cartBody);

// No update/remove/clear endpoints exist in backend yet — stubbed
export const removeCartItem = (itemId) =>
  Promise.reject(new Error("Remove cart item not yet supported by backend"));

export const clearCart = () =>
  Promise.reject(new Error("Clear cart not yet supported by backend"));
