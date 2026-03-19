import React from "react";
import { Plus, Star, Leaf } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";

const MenuItemCard = ({ item, restaurantId, restaurantName }) => {
  const { addItem, items, increment, decrement } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const qty = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(restaurantId, restaurantName, item);
    toast.success(`${item.name} added to cart`, { icon: "🛒" });
  };

  return (
    <div className="card p-4 flex gap-4 items-start">
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {item.isVeg && (
            <span className="badge bg-green-50 text-green-600 border border-green-200">
              <Leaf size={10} /> Veg
            </span>
          )}
          {item.isPopular && (
            <span className="badge bg-brand-50 text-brand-600">
              🔥 Popular
            </span>
          )}
        </div>
        <h4 className="font-semibold text-neutral-900 text-sm mb-1">{item.name}</h4>
        <p className="text-xs text-neutral-400 mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3">
          <span className="font-bold text-neutral-900">{formatCurrency(item.price)}</span>
          {item.rating && (
            <span className="text-xs text-neutral-400 flex items-center gap-0.5">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              {item.rating}
            </span>
          )}
        </div>
      </div>

      {/* Image + Cart Actions */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-16 object-cover rounded-xl border border-neutral-100"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        {qty === 0 ? (
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
          >
            <Plus size={13} /> Add
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-brand-50 rounded-lg px-2 py-1">
            <button
              onClick={() => decrement(item.id)}
              className="w-6 h-6 rounded-md bg-brand-500 text-white flex items-center justify-center text-base font-bold leading-none hover:bg-brand-600 transition-colors"
            >−</button>
            <span className="text-sm font-bold text-brand-700 min-w-4 text-center">{qty}</span>
            <button
              onClick={() => { addItem(restaurantId, restaurantName, item); }}
              className="w-6 h-6 rounded-md bg-brand-500 text-white flex items-center justify-center text-base font-bold leading-none hover:bg-brand-600 transition-colors"
            >+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
