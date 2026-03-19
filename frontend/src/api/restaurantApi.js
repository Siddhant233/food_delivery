import axiosClient from "./axiosClient";

export const getRestaurants = (params) =>
  axiosClient.get("/restaurants", { params });

export const getRestaurantById = (id) =>
  axiosClient.get(`/restaurants/${id}`);

export const getRestaurantMenu = (id) =>
  axiosClient.get(`/restaurants/${id}/menu`);

export const searchRestaurants = (query) =>
  axiosClient.get("/restaurants/search", { params: { q: query } });

export const getRestaurantsByCategory = (category) =>
  axiosClient.get("/restaurants", { params: { category } });
