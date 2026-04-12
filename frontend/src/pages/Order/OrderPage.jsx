import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  Star,
} from "lucide-react";
import useOrder from "../../hooks/useOrder";
import { formatCurrency, formatDate, formatTime } from "../../utils/helpers";
import { ORDER_STATUS_STEPS } from "../../utils/constants";
import { SectionLoader } from "../../components/common/Loader/Loader";
import Button from "../../components/common/Button/Button";

const STATUS_PROGRESS = {
  CONFIRMED: 1,
  PREPARING: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
};

// Demo orders for when there's no backend
const DEMO_ORDERS = [
  {
    id: "ORD-2024001",
    restaurantName: "The Burger Joint",
    status: "DELIVERED",
    total: 28.45,
    createdAt: "2026-03-14T10:30:00Z",
    items: [
      { name: "Classic Cheeseburger", quantity: 2 },
      { name: "Loaded Fries", quantity: 1 },
    ],
    estimatedDelivery: "11:00 AM",
  },
  {
    id: "ORD-2024002",
    restaurantName: "Sakura Sushi",
    status: "OUT_FOR_DELIVERY",
    total: 45.9,
    createdAt: "2026-03-14T12:00:00Z",
    items: [
      { name: "Salmon Sashimi", quantity: 1 },
      { name: "Dragon Roll", quantity: 2 },
    ],
    estimatedDelivery: "12:45 PM",
  },
];

const OrderStatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    PREPARING: "bg-orange-50 text-orange-700 border-orange-200",
    OUT_FOR_DELIVERY: "bg-indigo-50 text-indigo-700 border-indigo-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-500 border-red-200",
  };
  const labels = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PREPARING: "Preparing",
    OUT_FOR_DELIVERY: "On the Way",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return (
    <span
      className={`badge border text-xs ${styles[status] || styles.PENDING}`}
    >
      {labels[status] || status}
    </span>
  );
};

const OrderTracker = ({ status }) => {
  const progress = STATUS_PROGRESS[status] || 0;
  return (
    <div className="my-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-neutral-100 -z-0" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-brand-500 transition-all duration-700 -z-0"
          style={{
            width: `${((progress - 1) / (ORDER_STATUS_STEPS.length - 1)) * 100}%`,
          }}
        />
        {ORDER_STATUS_STEPS.map((step, i) => {
          const done = i + 1 <= progress;
          const active = i + 1 === progress;
          return (
            <div
              key={step.key}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300 ${
                  done
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "bg-white border-neutral-200 text-neutral-300"
                } ${active ? "ring-4 ring-brand-100" : ""}`}
              >
                {done ? "✓" : step.icon}
              </div>
              <span
                className={`text-xs font-medium text-center max-w-16 ${done ? "text-brand-600" : "text-neutral-400"}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderPage = () => {
  const { id } = useParams();
  const { orders, fetchOrders, loading } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const displayOrders = orders.length > 0 ? orders : DEMO_ORDERS;

  useEffect(() => {
    if (id) {
      const found = displayOrders.find((o) => o.id === id);
      if (found) setSelectedOrder(found);
    }
  }, [id, displayOrders]);

  if (selectedOrder) {
    return (
      <div className="pt-16 min-h-screen bg-neutral-50">
        <div className="page-container py-8 max-w-2xl">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-500 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> All Orders
          </button>
          <div className="card p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  {selectedOrder.restaurantName}
                </h2>
                <p className="text-sm text-neutral-400">
                  {selectedOrder.id} · {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <OrderStatusBadge status={selectedOrder.status} />
            </div>

            {selectedOrder.status !== "CANCELLED" &&
              selectedOrder.status !== "PENDING" && (
                <OrderTracker status={selectedOrder.status} />
              )}

            {selectedOrder.status === "OUT_FOR_DELIVERY" && (
              <div className="bg-brand-50 rounded-xl p-4 mb-4 flex items-center gap-3">
                <span className="text-2xl">🛵</span>
                <div>
                  <p className="font-semibold text-brand-700 text-sm">
                    Your order is on its way!
                  </p>
                  <p className="text-xs text-brand-500">
                    Estimated arrival: {selectedOrder.estimatedDelivery}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 border-t border-neutral-100 pt-4">
              <h3 className="font-semibold text-neutral-800 text-sm mb-3">
                Items Ordered
              </h3>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-neutral-600"
                  >
                    <span>{item.name}</span>
                    <span className="text-neutral-400">×{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 mt-4 pt-3 flex justify-between font-bold">
                <span className="text-neutral-900">Total</span>
                <span className="text-brand-600">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      <div className="page-container py-8">
        <h1 className="section-title mb-6">My Orders</h1>
        {loading ? (
          <SectionLoader />
        ) : displayOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-neutral-700 mb-2">
              No orders yet
            </h2>
            <p className="text-neutral-400 mb-8">
              Your order history will appear here.
            </p>
            <Link to="/">
              <Button>Order Now</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {displayOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="card p-5 w-full text-left hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                      {order.restaurant.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {order.orderId} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.orderstatus} />
                </div>
                <p className="text-sm text-neutral-500 truncate mb-3">
                  {order.items?.map((i) => i.name).join(", ")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">
                    {formatCurrency(order.totalAmount)}
                  </span>
                  <span className="text-xs text-brand-500 font-medium group-hover:underline">
                    View details →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
