import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  getOrSeedData,
  saveLocalData,
  getNextId,
  getLocalData,
} from "../utils/localStorage";

const API_URL = "https://jsonplaceholder.typicode.com";

const localError = (error) => ({
  error: {
    status: "CUSTOM_ERROR",
    error: error.message || "Something went wrong",
  },
});

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/`,
  }),

  tagTypes: ["User", "Album"],

  endpoints: (builder) => ({

    // GET ALL USERS
    getUsers: builder.query({
      async queryFn() {
        try {
          const users = await getOrSeedData("users", "users");
          return { data: users };
        } catch (error) {
          return localError(error);
        }
      },
      providesTags: ["User"],
    }),

    // GET USER BY ID
    getUserById: builder.query({
      async queryFn(id) {
        try {
          const users = await getOrSeedData("users", "users");
          const user = users.find((item) => item.id === Number(id));

          if (!user) {
            return {
              error: {
                status: 404,
                data: { message: "User not found" },
              },
            };
          }

          return { data: user };
        } catch (error) {
          return localError(error);
        }
      },
      providesTags: ["User"],
    }),

    // CREATE USER
   createUser: builder.mutation({
  async queryFn(newUser) {
    try {
      const users = getLocalData("users") || [];

      const createdUser = {
        ...newUser,
        id: getNextId(users),
      };

      const updatedUsers = [...users, createdUser];

      saveLocalData("users", updatedUsers);

      return { data: createdUser };
    } catch (error) {
      return localError(error);
    }
  },
  invalidatesTags: ["User"],
}),

    // UPDATE USER
    updateUser: builder.mutation({
      async queryFn({ id, ...updatedUser }) {
        try {
          const users = await getOrSeedData("users", "users");

          const index = users.findIndex(
            (user) => user.id === Number(id)
          );

          if (index === -1) {
            return {
              error: {
                status: 404,
                data: { message: "User not found" },
              },
            };
          }

          users[index] = {
            ...users[index],
            ...updatedUser,
          };

          saveLocalData("users", users);

          return { data: users[index] };
        } catch (error) {
          return localError(error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      async queryFn(id) {
        try {
          const users = await getOrSeedData("users", "users");

          const updatedUsers = users.filter(
            (user) => user.id !== Number(id)
          );

          saveLocalData("users", updatedUsers);

          return { data: { success: true, id } };
        } catch (error) {
          return localError(error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // GET ALBUMS BY USER ID
    getAlbumsByUserId: builder.query({
      async queryFn(userId) {
        try {
          const albums = await getOrSeedData("albums", "albums");

          const userAlbums = albums.filter(
            (album) => album.userId === Number(userId)
          );

          return { data: userAlbums };
        } catch (error) {
          return localError(error);
        }
      },
      providesTags: ["Album"],
    }),

    // CREATE ALBUM
   createAlbum: builder.mutation({
  async queryFn(newAlbum) {
    try {
      const albums = getLocalData("albums") || [];

      const createdAlbum = {
        ...newAlbum,
        id: getNextId(albums),
      };

      const updatedAlbums = [...albums, createdAlbum];

      saveLocalData("albums", updatedAlbums);

      return { data: createdAlbum };
    } catch (error) {
      return localError(error);
    }
  },
  invalidatesTags: ["Album"],
}),
    // GET TODOS BY USER ID (still using JSONPlaceholder)
    getTodosByUserId: builder.query({
      query: (userId) => `users/${userId}/todos`,
    }),

    // GET PHOTOS BY ALBUM ID (still using JSONPlaceholder)
    getPhotosByAlbumId: builder.query({
      query: (albumId) => `albums/${albumId}/photos`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAlbumsByUserIdQuery,
  useCreateAlbumMutation,
  useGetTodosByUserIdQuery,
  useGetPhotosByAlbumIdQuery,
} = userApi;

