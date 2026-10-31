import { useGetPostsQuery, useDeletePostMutation } from "../api/postApi";
import PostCard from "../components/post/PostCard";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import SearchPost from "./SearchPost";

function PostPage() {
  const navigate = useNavigate();

  const { data: posts, isLoading, isError, error } = useGetPostsQuery();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deletePost(id).unwrap();

      toast.success("Post deleted successfully!");

      // Show posts page after deleting
      navigate("/posts");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete post!");
    }
  };

  if (isLoading) {
    return (
      <p className="p-8 text-center text-lg text-blue-600">Loading posts...</p>
    );
  }

  if (isError) {
    return (
      <p className="p-8 text-center text-red-600">
        Failed to load posts: {error?.error || "Please try again."}
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* <h1 className="mb-8 text-3xl font-bold text-slate-800">All Posts</h1> */}
      <SearchPost />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onView={() => navigate(`/post/${post.id}`)}
            onEdit={() => navigate(`/edit-post/${post.id}`)}
            onDelete={() => handleDelete(post.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </section>
  );
}

export default PostPage;
