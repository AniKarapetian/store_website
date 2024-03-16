import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket, BasketItem } from "../../components/basket/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<Basket> = {
  data: [],
  item: null,
  loading: false,
  error: "",
};

export const getBasketByUserId = createAsyncThunk(
  "baskets/getByUserId",
  async (userId: string) => {
    const response = await fetch(`${API_URL}/baskets?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch basket");
    }
    const data = await response.json();
    return data ? data[0] : {};
  }
);

export const createBasket = createAsyncThunk(
  "baskets/createBasket",
  async (newData: Basket) => {
    const response = await fetch(`${API_URL}/baskets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to add basket");
    }
    const basket = await response.json();
    return basket;
  }
);

export const updateBasket = createAsyncThunk(
  "baskets/updateBasket",
  async (newData: Basket) => {
    const response = await fetch(`${API_URL}/baskets/${newData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update basket");
    }
    const basket = await response.json();
    return basket;
  }
);

const basketsSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasketByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBasketByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.item = action.payload;
      })
      .addCase(getBasketByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch basket";
      })
      .addCase(createBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(createBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add basket";
      })
      .addCase(updateBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const itemIndex = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        itemIndex !== -1 && (state.data[itemIndex] = action.payload);
      })
      .addCase(updateBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update basket";
      });
  },
});

export default basketsSlice.reducer;
