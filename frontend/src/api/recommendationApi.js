import axiosClient from "./axiosClient";

export const getRecommendations = () =>
  axiosClient.get("/recommendations");

export const getPersonalizedRecommendations = (userId) =>
  axiosClient.get(`/recommendations/user/${userId}`);
