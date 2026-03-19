import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Bike, MapPin, Info } from "lucide-react";
import MenuItemCard from "../../components/restaurant/MenuItemCard";
import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/helpers";

// Demo data per restaurant
const DEMO_MENU = {
  1: {
    name: "The Burger Joint", cuisine: "American", rating: 4.7, deliveryTime: "20-30",
    deliveryFee: 0, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    address: "123 Main St, Downtown",
    categories: [
      {
        name: "Burgers", items: [
          { id: 101, name: "Classic Cheeseburger", description: "Juicy beef patty with cheddar, lettuce, tomato and pickles", price: 10.99, rating: 4.8, isPopular: true, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=150&fit=crop" },
          { id: 102, name: "Spicy BBQ Burger", description: "Crispy chicken with spicy BBQ sauce and coleslaw", price: 12.49, rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&h=150&fit=crop" },
          { id: 103, name: "Veggie Burger", description: "Black bean patty with avocado cream and fresh toppings", price: 9.99, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200&h=150&fit=crop" },
        ]
      },
      {
        name: "Sides & Extras", items: [
          { id: 104, name: "Loaded Fries", description: "Crispy fries with cheese sauce and jalapenos", price: 5.99, isPopular: true },
          { id: 105, name: "Onion Rings", description: "Golden battered onion rings with dipping sauce", price: 4.99 },
        ]
      },
      {
        name: "Drinks", items: [
          { id: 106, name: "Craft Milkshake", description: "Thick creamy shake in Vanilla, Chocolate or Strawberry", price: 6.99, isVeg: true },
          { id: 107, name: "Fountain Soda", description: "Pepsi, Coke, Sprite or Lemonade", price: 2.49, isVeg: true },
        ]
      }
    ]
  }
};

const DEFAULT_RESTAURANT = {
  name: "Restaurant", cuisine: "Various", rating: 4.5, deliveryTime: "25-35",
  deliveryFee: 2.99, imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828d592?w=800&h=400&fit=crop",
  address: "456 Food Lane",
  categories: [
    {
      name: "Popular Items", items: [
        { id: 201, name: "House Special", description: "Chef's signature dish with premium ingredients", price: 14.99, isPopular: true },
        { id: 202, name: "Daily Fresh Bowl", description: "Fresh seasonal ingredients in our signature sauce", price: 11.99, isVeg: true },
      ]
    }
  ]
};

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const { count } = useCart();

  const restaurant = DEMO_MENU[parseInt(id)] || DEFAULT_RESTAURANT;
  const { name, cuisine, rating, deliveryTime, deliveryFee, imageUrl, address, categories } = restaurant;

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      {/* Header Image */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-neutral-200">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/20 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-neutral-700 hover:bg-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="page-container -mt-8 relative z-10">
        {/* Restaurant Info Card */}
        <div className="card p-5 md:p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-1">{name}</h1>
              <p className="text-neutral-500 text-sm mb-3">{cuisine}</p>
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <MapPin size={13} className="text-brand-500" />
                <span>{address}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm text-neutral-900">{rating?.toFixed(1)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500 border-t border-neutral-100 pt-4">
            <span className="flex items-center gap-1.5"><Clock size={15} className="text-brand-500" />{deliveryTime} min</span>
            <span className="flex items-center gap-1.5"><Bike size={15} className="text-brand-500" />
              {deliveryFee === 0 ? "Free delivery" : formatCurrency(deliveryFee) + " delivery"}
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                activeTab === i
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-32">
          {categories[activeTab]?.items.map((item) => (
            <MenuItemCard key={item.id} item={item} restaurantId={parseInt(id)} restaurantName={name} />
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {count > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-4 animate-slide-up">
          <button
            onClick={() => navigate("/cart")}
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition-all active:scale-95"
          >
            <span className="bg-white text-brand-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{count}</span>
            View Cart
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
