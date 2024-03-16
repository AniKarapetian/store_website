import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/product/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<Product> = {
  data: [],
  loading: false,
  error: "",
};

export const get = createAsyncThunk("products/getProducts", async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
});

export const create = createAsyncThunk(
  "products/createProduct",
  async (newData: Product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const product = await response.json();
    return product;
  }
);

export const update = createAsyncThunk(
  "products/updateProduct",
  async (newData: Product) => {
    const response = await fetch(`${API_URL}/products/${newData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const product = await response.json();
    return product;
  }
);

export const remove = createAsyncThunk(
  "products/removeProduct",
  async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove product");
    }
    return id;
  }
);

export const getById = createAsyncThunk(
  "products/getProductById",
  async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return product;
  }
);

const productsSlice = createSlice({
  name: "products",
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
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
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
        state.error = action.error.message || "Failed to fetch product";
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
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove product";
      });
  },
});

export default productsSlice.reducer;
