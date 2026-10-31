import { FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";

function PostCard({
  post,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  showReadMore = true,
  isDeleting = false,
}) {
  if (!post) return null;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span className="text-sm font-semibold text-cyan-600">
        Post #{post.id}
      </span>

      <h2 className="my-3 text-xl font-bold capitalize text-slate-800">
        {post.title}
      </h2>

      <p className="mb-4 leading-6 text-slate-600">{post.body}</p>

      <p className="text-sm text-slate-400">User ID: {post.userId}</p>

      {showReadMore && (
        <button
          onClick={onView}
          className="mt-4 flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-800"
        >
          Read More <FaArrowRight />
        </button>
      )}

      {showActions && (
        <div className="mt-5 flex gap-4">
          <button
            onClick={onEdit}
            className="rounded-lg bg-orange-400 px-4 py-2 text-white hover:bg-orange-600"
          >
            <FaEdit size={18} />
          </button>

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          >
            <FaTrash size={18} />
          </button>
        </div>
      )}
    </article>
  );
}

export default PostCard;
