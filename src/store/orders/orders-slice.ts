import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../components/order/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<Order> = {
  data: [],
  loading: false,
  error: "",
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId: string) => {
    const response = await fetch(`${API_URL}/orders?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (newData: Order) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to add order");
    }
    const order = await response.json();
    return order;
  }
);

export const getById = createAsyncThunk(
  "orders/getOrderById",
  async (id: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }
    const order = await response.json();
    return order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add order";
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch order";
      });
  },
});

export default ordersSlice.reducer;
