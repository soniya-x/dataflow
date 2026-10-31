import { useState } from "react";
import { useGetPostByIdQuery } from "../api/postApi";

function SearchPost() {
  const [searchId, setSearchId] = useState("");
  const [postId, setPostId] = useState(null);

  const {
    data: post,
    isFetching,
    isError,
    error,
  } = useGetPostByIdQuery(postId, {
    skip: postId === null,
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const id = Number(searchId);

    if (!Number.isInteger(id) || id < 1 || id > 100) {
      setPostId(null);
      return;
    }

    setPostId(id);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Search Post by ID
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="number"
          min="1"
          max="100"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter post ID (1–100)"
          className=" flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
          required
        />

        <button
          type="submit"
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          Search
        </button>
      </form>

      {isFetching && <p className="text-slate-600">Searching for post...</p>}

      {post && !isFetching && (
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-cyan-700">
            Post #{post.id}
          </p>

          <h2 className="mb-3 text-2xl font-bold text-slate-800">
            {post.title}
          </h2>

          <p className="mb-4 leading-7 text-slate-600">{post.body}</p>

          <p className="text-sm text-slate-400">User ID: {post.userId}</p>
        </article>
      )}

      {isError && (
        <p className="text-red-600">
          {error?.status === 404
            ? "Post not found."
            : "Failed to fetch the post. Please try again."}
        </p>
      )}

      {postId !== null && !isFetching && !isError && !post && (
        <p className="text-slate-600">No post found.</p>
      )}

      {searchId !== "" &&
        (!Number.isInteger(Number(searchId)) ||
          Number(searchId) < 1 ||
          Number(searchId) > 100) && (
          <p className="mt-3 text-sm text-red-600">
            Please enter a post ID between 1 and 100.
          </p>
        )}
    </section>
  );
}

export default SearchPost;
