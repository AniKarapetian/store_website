import { Basket } from "../components/basket/type";
import { Order } from "../components/order/type";
import { Product } from "../components/product/type";
import { User } from "../components/user/type";
import { API_URL } from "../constants";

export default {
  basket: {
    createBasket: async (newData: Basket) => {
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
    },
    getBasketByUserId: async (userId: string) => {
      const response = await fetch(`${API_URL}/baskets?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch basket");
      }
      const data = await response.json();
      return data ? data[0] : {};
    },
    updateBasket: async (newData: Basket) => {
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
    },
  },
  order: {
    getOrders: async (userId: string) => {
      const response = await fetch(`${API_URL}/orders?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      return data;
    },
    createOrder: async (newData: Order) => {
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
    },
    getOrderById: async (id: string) => {
      const response = await fetch(`${API_URL}/orders/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }
      const order = await response.json();
      return order;
    },
  },
  user: {
    fetchUsers: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },

    createUser: async (data: User) => {
      return fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    },

    removeUser: async (id: string) => {
      return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.error("Error:", error);
        throw error;
      });
    },

    updateUser: async (data: User) => {
      {
        return fetch(`${API_URL}/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.error("Error:", error);
            throw error;
          });
      }
    },
  },
  product: {
    getProductById: async (id: string) => {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      return product;
    },
    removeProduct: async (id: string) => {
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
    },
    updateProduct: async (newData: Product) => {
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
    },
    createProduct: async (newData: Product) => {
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
    },
    getProducts: async () => {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    },
  },
};
