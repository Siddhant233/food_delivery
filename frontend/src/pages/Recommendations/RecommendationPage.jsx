import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../../store/recommendationSlice";
import { SectionLoader } from "../../components/common/Loader/Loader";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import useAuth from "../../hooks/useAuth";

// Demo recommendations
const DEMO_RECS = [
  { id: 6, name: "Green Bowl", cuisine: "Healthy", rating: 4.8, reviewCount: 945, deliveryTime: "15-25", deliveryFee: 1.49, isOpen: true, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 2, name: "Sakura Sushi", cuisine: "Japanese", rating: 4.9, reviewCount: 1240, deliveryTime: "30-45", deliveryFee: 1.99, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
  { id: 8, name: "Sweet Tooth Bakery", cuisine: "Desserts", rating: 4.9, reviewCount: 1587, deliveryTime: "15-20", deliveryFee: 0.99, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
];

const RecommendationPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.recommendation);
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "you";

  useEffect(() => { dispatch(fetchRecommendations()); }, []);

  const displayItems = items.length > 0 ? items : DEMO_RECS;

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      <div className="page-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">✨ Picked for {firstName}</h1>
          <p className="text-neutral-400 text-sm mt-1">
            AI-powered picks based on your taste and health goals.
          </p>
        </div>

        {/* Health Tips Banner */}
        <div className="card p-5 mb-8 bg-gradient-to-r from-green-50 to-brand-50 border border-green-100">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🥗</span>
            <div>
              <h3 className="font-bold text-neutral-900 mb-1">Your Health Goal: Stay Balanced</h3>
              <p className="text-sm text-neutral-500">
                We've highlighted restaurants with nutritious options that fit your dietary preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { emoji: "🔥", title: "Trending Near You", desc: "Most ordered this week" },
            { emoji: "💚", title: "Healthy Picks", desc: "Based on your preferences" },
            { emoji: "⚡", title: "Quick Delivery", desc: "Under 25 minutes" },
          ].map((card) => (
            <div key={card.title} className="card p-4 flex items-center gap-3">
              <span className="text-2xl">{card.emoji}</span>
              <div>
                <p className="font-semibold text-sm text-neutral-900">{card.title}</p>
                <p className="text-xs text-neutral-400">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Grid */}
        <h2 className="font-bold text-lg text-neutral-800 mb-4">Recommended Restaurants</h2>
        {loading ? <SectionLoader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayItems.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
