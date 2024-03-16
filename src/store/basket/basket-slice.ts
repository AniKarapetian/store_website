import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketItem } from "../../components/basket/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<BasketItem> = {
  data: [],
  loading: false,
  error: "",
};

export const get = createAsyncThunk("baskets/getBaskets", async () => {
  const response = await fetch(`${API_URL}/baskets`);
  if (!response.ok) {
    throw new Error("Failed to fetch baskets");
  }
  const data = await response.json();
  return data;
});

export const create = createAsyncThunk(
  "baskets/createBasket",
  async (newData: BasketItem) => {
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

export const update = createAsyncThunk(
  "baskets/updateBasket",
  async (newData: BasketItem) => {
    const response = await fetch(`${API_URL}/baskets`, {
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

export const remove = createAsyncThunk(
  "baskets/removeBasket",
  async (id: string) => {
    const response = await fetch(`${API_URL}/baskets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      //check
      throw new Error("Failed to remove basket");
    }
    return id;
  }
);

export const getById = createAsyncThunk(
  "baskets/getBasketById",
  async (id: string) => {
    const response = await fetch(`${API_URL}/baskets/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch basket");
    }
    const basket = await response.json();
    return basket;
  }
);

const basketsSlice = createSlice({
  name: "baskets",
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
        state.error = action.error.message || "Failed to fetch baskets";
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add basket";
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
        state.error = action.error.message || "Failed to fetch basket";
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
        state.error = action.error.message || "Failed to update basket";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove basket";
      });
  },
});

export default basketsSlice.reducer;
