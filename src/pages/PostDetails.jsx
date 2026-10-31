import { useParams, useNavigate } from "react-router-dom";
import { useGetPostsQuery, useGetCommentsByPostIdQuery } from "../api/postApi";
import PostCard from "../components/post/PostCard";
function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch all post
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  //find selected post
  const post = posts?.find((item) => Number(item.id) === Number(id));

  //fetch comments using selected post id
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetCommentsByPostIdQuery(id);

  if (isLoading) return <p>Loading post...</p>;

  if (isError || !post) return <p>Post not found!</p>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 rounded-lg bg-slate-800 px-4 py-2 text-white"
      >
        ← Back to Posts
      </button>

      <h1 className="mb-5 text-2xl font-bold text-slate-800">Post Details</h1>
      <PostCard post={post} showActions={false} showReadMore={false} />

      {/* Comments Section */}
      <section className="mt-10">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          Comments({comments?.length || 0})
        </h2>

        {commentsLoading && <p>Loading comments...</p>}

        {commentsError && (
          <p className="text-red-500">Failed to load comments.</p>
        )}

        {!commentsLoading && !commentsError && (
          <div className="space-y-4">
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-bold text-slate-800">
                    commentName:{comment.name}
                  </h3>

                  <p className="mt-1 text-sm text-cyan-600">{comment.email}</p>

                  <p className="mt-3 leading-6 text-slate-600">
                    {comment.body}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments found for this post.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default PostDetails;
