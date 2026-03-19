import axiosClient from "./axiosClient";

export const loginUser = (credentials) =>
  axiosClient.post("/auth/login", credentials);

export const registerUser = (userData) =>
  axiosClient.post("/auth/register", userData);

// Fetch profile by userId stored in localStorage after login
export const getUserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id = user?.userId;
  return axiosClient.get(`/users/${id}`);
};

export const updateUserProfile = (id, data) =>
  axiosClient.put(`/users/${id}`, data);
