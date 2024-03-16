import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/product/type";
import { StateType } from "../type";
import { API_URL } from "../../constants";
const initialState: StateType<Product> = {
  data: [],
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
});

export const createProduct = createAsyncThunk(
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

export const updateProduct = createAsyncThunk(
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

export const removeProduct = createAsyncThunk(
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

export const getProductById = createAsyncThunk(
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
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const itemIndex = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        itemIndex !== -1 && (state.data[itemIndex] = action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove product";
      });
  },
});

export default productsSlice.reducer;
