import React, { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import { SectionLoader } from "../../components/common/Loader/Loader";
import { FOOD_CATEGORIES } from "../../utils/constants";
import { debounce } from "../../utils/helpers";
import useAuth from "../../hooks/useAuth";

// Sample data for demo (replace with API call in production)
const DEMO_RESTAURANTS = [
  { id: 1, name: "The Burger Joint", cuisine: "American", rating: 4.7, reviewCount: 892, deliveryTime: "20-30", deliveryFee: 0, isOpen: true, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 2, name: "Sakura Sushi", cuisine: "Japanese", rating: 4.9, reviewCount: 1240, deliveryTime: "30-45", deliveryFee: 1.99, isOpen: true, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
  { id: 3, name: "Spice Garden", cuisine: "Indian", rating: 4.5, reviewCount: 673, deliveryTime: "25-40", deliveryFee: 0, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop" },
  { id: 4, name: "Mama's Pizza", cuisine: "Italian", rating: 4.6, reviewCount: 521, deliveryTime: "20-35", deliveryFee: 2.99, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
  { id: 5, name: "Dragon Wok", cuisine: "Chinese", rating: 4.3, reviewCount: 387, deliveryTime: "25-40", deliveryFee: 0, isOpen: false, imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop" },
  { id: 6, name: "Green Bowl", cuisine: "Healthy", rating: 4.8, reviewCount: 945, deliveryTime: "15-25", deliveryFee: 1.49, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 7, name: "Tacos El Rey", cuisine: "Mexican", rating: 4.4, reviewCount: 298, deliveryTime: "20-30", deliveryFee: 0, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop" },
  { id: 8, name: "Sweet Tooth Bakery", cuisine: "Desserts", rating: 4.9, reviewCount: 1587, deliveryTime: "15-20", deliveryFee: 0.99, isOpen: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
];

const HomePage = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading] = useState(false);

  const debouncedSet = useMemo(() => debounce((v) => setDebouncedQuery(v), 300), []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedSet(e.target.value);
  };

  const filtered = useMemo(() => {
    let list = DEMO_RESTAURANTS;
    if (debouncedQuery) {
      list = list.filter((r) =>
        r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }
    if (activeCategory !== "all") {
      list = list.filter((r) =>
        r.cuisine.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    return list;
  }, [debouncedQuery, activeCategory]);

  const firstName = user?.name?.split(" ")[0] || user?.sub?.split("@")[0] || "there";

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="page-container py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-brand-400 font-medium text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-brand-400 inline-block" />
              Fast. Fresh. Delivered.
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Hey {firstName}, <br />
              <span className="text-brand-400">Hungry?</span> Let's fix that.
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Order from 500+ restaurants and get hot food delivered in under 30 minutes.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines or dishes..."
                  value={query}
                  onChange={handleSearch}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/15 transition-all text-sm"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setDebouncedQuery(""); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8 space-y-8">
        {/* Category Filter */}
        <section>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FOOD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Featured */}
        {activeCategory === "all" && !debouncedQuery && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">✨ Featured Today</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEMO_RESTAURANTS.filter((r) => r.isFeatured).map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </section>
        )}

        {/* All Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">
              {debouncedQuery
                ? `Results for "${debouncedQuery}"`
                : activeCategory !== "all"
                ? `${FOOD_CATEGORIES.find((c) => c.id === activeCategory)?.label} Restaurants`
                : "🍽️ All Restaurants"}
            </h2>
            <span className="text-sm text-neutral-400">{filtered.length} places</span>
          </div>
          {loading ? (
            <SectionLoader />
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🍽️</p>
              <p className="text-xl font-bold text-neutral-700 mb-2">No restaurants found</p>
              <p className="text-neutral-400 text-sm">Try a different cuisine or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
