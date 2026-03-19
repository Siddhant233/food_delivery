export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const FOOD_CATEGORIES = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burger", label: "Burgers", emoji: "🍔" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "indian", label: "Indian", emoji: "🍛" },
  { id: "chinese", label: "Chinese", emoji: "🍜" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
  { id: "healthy", label: "Healthy", emoji: "🥗" },
];

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_STEPS = [
  { key: "CONFIRMED", label: "Order Confirmed", icon: "✅" },
  { key: "PREPARING", label: "Being Prepared", icon: "👨‍🍳" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: "🛵" },
  { key: "DELIVERED", label: "Delivered", icon: "🎉" },
];

export const DELIVERY_FEE = 2.99;
export const TAX_RATE = 0.08;
