import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder, getOrders, getOrderById } from "../api/orderApi";

export const fetchOrders = createAsyncThunk("order/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.userId;
    if (!userId) throw new Error("User ID missing");
    const res = await getOrders(userId);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message || "Failed to fetch orders");
  }
});

export const fetchOrderById = createAsyncThunk("order/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await getOrderById(id);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch order");
  }
});

export const createOrder = createAsyncThunk("order/create", async (orderData, { rejectWithValue }) => {
  try {
    const res = await placeOrder(orderData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to place order");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.pending, (state) => { state.loading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
