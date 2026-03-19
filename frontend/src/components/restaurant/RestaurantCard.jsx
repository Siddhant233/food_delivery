import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ChevronRight, Bike } from "lucide-react";
import { formatCurrency, getRatingColor } from "../../utils/helpers";

const RestaurantCard = ({ restaurant }) => {
  const {
    id, name, cuisine, imageUrl, rating, reviewCount,
    deliveryTime, deliveryFee, isOpen = true, isFeatured,
  } = restaurant;

  return (
    <Link to={`/restaurants/${id}`} className="card group block overflow-hidden">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl || `https://source.unsplash.com/400x300/?${cuisine},food`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://placehold.co/400x300/f97316/white?text=🍽️"; }}
        />
        {isFeatured && (
          <span className="absolute top-3 left-3 badge bg-brand-500 text-white text-xs">
            ⭐ Featured
          </span>
        )}
        {!isOpen && (
          <div className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-neutral-800 px-4 py-1.5 rounded-full">
              Currently Closed
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-900/50 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-bold text-neutral-900 text-base group-hover:text-brand-600 transition-colors">
            {name}
          </h3>
          <div className={`flex items-center gap-1 text-sm font-semibold ${getRatingColor(rating)}`}>
            <Star size={13} className="fill-current" />
            <span>{rating?.toFixed(1) || "4.0"}</span>
          </div>
        </div>
        <p className="text-sm text-neutral-500 mb-3">{cuisine} · {reviewCount || 0} reviews</p>
        <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>{deliveryTime || "25-35"} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Bike size={13} />
            <span>{deliveryFee === 0 ? "Free delivery" : formatCurrency(deliveryFee || 2.99)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
