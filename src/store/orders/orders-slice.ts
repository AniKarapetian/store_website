import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../components/order/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<Order> = {
  data: [],
  loading: false,
  error: "",
};

export const get = createAsyncThunk("orders/getOrders", async () => {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  return data;
});

export const create = createAsyncThunk(
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

export const update = createAsyncThunk(
  "orders/updateOrder",
  async (newData: Order) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update order");
    }
    const order = await response.json();
    return order;
  }
);

export const remove = createAsyncThunk(
  "orders/removeOrder",
  async (id: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      //check
      throw new Error("Failed to remove order");
    }
    return id;
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
      .addCase(get.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
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
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const itemIndex = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        itemIndex !== -1 && (state.data[itemIndex] = action.payload);
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove order";
      });
  },
});

export default ordersSlice.reducer;
