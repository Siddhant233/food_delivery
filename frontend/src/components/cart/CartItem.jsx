import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-neutral-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-neutral-900 text-sm truncate">{item.name}</p>
        <p className="text-brand-500 font-bold text-sm mt-0.5">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrement(item.id)}
          className="w-7 h-7 rounded-lg border border-neutral-200 hover:border-brand-400 flex items-center justify-center text-neutral-600 hover:text-brand-500 transition-all"
        >
          <Minus size={13} />
        </button>
        <span className="text-sm font-bold text-neutral-900 w-5 text-center">{item.quantity}</span>
        <button
          onClick={() => increment(item.id)}
          className="w-7 h-7 rounded-lg bg-brand-500 hover:bg-brand-600 flex items-center justify-center text-white transition-all"
        >
          <Plus size={13} />
        </button>
        <button
          onClick={() => removeItem(item.id)}
          className="ml-2 p-1.5 rounded-lg text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-all"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="text-right min-w-16">
        <span className="font-bold text-neutral-900 text-sm">{formatCurrency(item.price * item.quantity)}</span>
      </div>
    </div>
  );
};

export default CartItem;
