import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import CartItem from "../../components/cart/CartItem";
import Button from "../../components/common/Button/Button";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import { formatCurrency } from "../../utils/helpers";
import { DELIVERY_FEE, TAX_RATE } from "../../utils/constants";
import toast from "react-hot-toast";

const CartPage = () => {
  const { items, total, restaurantId, restaurantName, clearCart } = useCart();
  const { createOrder, loading } = useOrder();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const tax = total * TAX_RATE;
  const grandTotal = total + DELIVERY_FEE + tax;

  const handleCheckout = async () => {
    if (!address.trim()) {
      setAddressError("Please enter a delivery address");
      return;
    }
    setAddressError("");
    const result = await createOrder({
      restaurantId: restaurantId,
      items: items.map((i) => ({ itemId: i.id, quantity: i.quantity })),
      deliveryAddress: address,
      totalAmount: grandTotal,
    });
    if (!result.error) {
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } else {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center px-4 animate-fade-in">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
          <p className="text-neutral-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/">
            <Button size="lg">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      <div className="page-container py-8">
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-500 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="section-title mb-2">Your Cart</h1>
        <p className="text-sm text-neutral-400 mb-8">From <span className="font-semibold text-neutral-700">{restaurantName}</span></p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Delivery Address */}
            <div className="card p-5">
              <h3 className="font-semibold text-neutral-900 mb-3">📍 Delivery Address</h3>
              <textarea
                placeholder="Enter your full delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className={`input-field resize-none ${addressError ? "border-red-400" : ""}`}
              />
              {addressError && <p className="text-xs text-red-500 mt-1">{addressError}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold text-neutral-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery fee</span>
                  <span>{formatCurrency(DELIVERY_FEE)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between font-bold text-base text-neutral-900">
                  <span>Total</span>
                  <span className="text-brand-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
              <Button
                fullWidth
                size="lg"
                loading={loading}
                onClick={handleCheckout}
                className="mt-5"
              >
                Place Order · {formatCurrency(grandTotal)}
              </Button>
              <p className="text-xs text-center text-neutral-400 mt-3">
                🔒 Secure checkout. Estimated delivery {30} mins.
              </p>
            </div>

            <button
              onClick={() => { if (window.confirm("Clear cart?")) clearCart(); }}
              className="w-full text-sm text-red-400 hover:text-red-500 py-2 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
