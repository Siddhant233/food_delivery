import axiosClient from "./axiosClient";

// POST /api/orders — create an order
export const placeOrder = (orderData) =>
  axiosClient.post("/orders", orderData);

// GET /api/orders/user/{userId} — get orders for a user
export const getOrders = (userId) =>
  axiosClient.get(`/orders/user/${userId}`);

// These endpoints don't exist yet in backend — stubbed
export const getOrderById = (id) =>
  axiosClient.get(`/orders/${id}`);

export const cancelOrder = (id) =>
  Promise.reject(new Error("Cancel order not yet supported by backend"));
