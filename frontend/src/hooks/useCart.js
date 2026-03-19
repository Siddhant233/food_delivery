import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from "../store/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);
  const restaurantId = useSelector((s) => s.cart.restaurantId);
  const restaurantName = useSelector((s) => s.cart.restaurantName);

  return {
    items,
    total,
    count,
    restaurantId,
    restaurantName,
    addItem: (restaurantId, restaurantName, item) =>
      dispatch(addItem({ restaurantId, restaurantName, item })),
    removeItem: (id) => dispatch(removeItem(id)),
    increment: (id) => dispatch(incrementItem(id)),
    decrement: (id) => dispatch(decrementItem(id)),
    clearCart: () => dispatch(clearCart()),
  };
};

export default useCart;
