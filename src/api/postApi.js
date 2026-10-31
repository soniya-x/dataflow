import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  tagTypes: ["Post"],

  endpoints: (builder) => ({
    // GET: Fetch all posts
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),

    // GET: Fetch one post
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // 1.POST: Create post
    createPost: builder.mutation({
      // 2. configure the api request
      query: (newPost) => ({
        url: "posts", //  target the /posts endpoint
        method: "POST", //tells the api to create the post
        body: newPost, // send the post data in request  body
      }),

      //This is an RTK Query lifecycle callback. It runs when the mutation starts.
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
          // 3. wait for the post request to succed
          const { data: responsePost } = await queryFulfilled;

          // 4. update the cache posts list

          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (drapt) => {
              // 5. add a new post at the beginning
              const newId =
                drapt.length > 0
                  ? Math.max(...drapt.map((post) => Number(post.id))) + 1
                  : 1;
              drapt.unshift({
                ...newPost,
                ...responsePost,
                id: newId,
              });
            }),
          );
        } catch (error) {
          console.error("Create post failed:", error);
        }
      },
    }),

    // PATCH: Update post

    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: updatedPost,
      }),

      async onQueryStarted(
        { id, ...updatedPost },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data: responsePost } = await queryFulfilled;

          //Update the individual post cache
          //   dispatch(
          //     postApi.util.updateQueryData("getPostById", id, (draft) => {
          //       Object.assign(draft, updatedPost, responsePost);
          //     }),
          //   );

          // Update the posts list cache
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const post = draft.find((item) => item.id === Number(id));

              if (post) {
                Object.assign(post, updatedPost, responsePost);
              }
            }),
          );
        } catch (error) {
          console.error("Update post failed:", error);
        }
      },
    }),

    // DELETE: Delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          //Remove delete post from getPosts cache
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (drapt) => {
              return drapt.filter((post) => Number(post.id) !== Number(id));
            }),
          );
        } catch (error) {
          console.log("Delete post failed:", error);
        }
      },
    }),

    // GET: Fetch comments for a particular post
    getCommentsByPostId: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
    addComment: builder.mutation({
  query: (newComment) => ({
    url: "comments",
    method: "POST",
    body: newComment,
  }),
}),

    // GET: Fetch all users
    getUsers: builder.query({
      query: () => "users",
    }),

    // GET: Fetch albums based on user ID
    getAlbumsByUserId: builder.query({
      query: (userId) => `users/${userId}/albums`,
    }),

    getPhotosByAlbumId: builder.query({
      query: (albumId) => `album/${albumId}/photos`,
    }),

    // GET: Fetch todos based on user ID
    getTodosByUserId: builder.query({
      query: (userId) => `users/${userId}/todos`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useGetUsersQuery,
  useGetAlbumsByUserIdQuery,
  useGetPhotosByAlbumIdQuery,
  useGetTodosByUserIdQuery
} = postApi;
