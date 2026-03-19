import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrderById, createOrder } from "../store/orderSlice";

const useOrder = () => {
  const dispatch = useDispatch();
  const { orders, currentOrder, loading, error } = useSelector((s) => s.order);

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders: () => dispatch(fetchOrders()),
    fetchOrderById: (id) => dispatch(fetchOrderById(id)),
    createOrder: (data) => dispatch(createOrder(data)),
  };
};

export default useOrder;
