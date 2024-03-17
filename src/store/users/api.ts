import { User } from "../../components/user/type";
import { API_URL } from "../../constants";

export default {
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
};
